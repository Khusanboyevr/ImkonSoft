/* Scenes: sahnalar holat mashinasi. idle <-> transition, navbat yo'q, sakrash yo'q. */
(function () {
  'use strict';
  const C = (window.Cine = window.Cine || {});

  function Scenes(cfg, player) {
    this.cfg = cfg;
    this.player = player;
    this.index = 0;
    this.state = 'boot';
    this.direction = 'none';
    this.rate = cfg.playbackRate;
    this.sync();
  }

  Scenes.prototype.sync = function () {
    const h = document.documentElement;
    h.dataset.scene = String(this.index);
    h.dataset.sceneId = this.cfg.scenes[this.index].id;
    h.dataset.state = this.state;
    h.dataset.direction = this.direction;
  };

  Scenes.prototype.emit = function (name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail: detail }));
  };

  /* Joriy sahnadan dir tomonga o'tish uchun klip. */
  Scenes.prototype.clipFor = function (from, dir) {
    const list = this.cfg.transitions;
    if (dir > 0) {
      const t = list.find(function (x) { return x.from === from; });
      if (!t) return null;
      return { src: t.forward.src, from: t.forward.in || 0, to: t.forward.out == null ? 'end' : t.forward.out, target: t.to, name: t.name };
    }
    const t = list.find(function (x) { return x.to === from; });
    if (!t) return null;
    if (t.reverse && t.reverse.src) {
      return { src: t.reverse.src, from: t.reverse.in || 0, to: t.reverse.out == null ? 'end' : t.reverse.out, target: t.from, name: t.name };
    }
    // Zaxira: reverse fayli yo'q, oldinga faylni orqaga protyajka qilamiz.
    return { src: t.forward.src, from: t.forward.out == null ? 'end' : t.forward.out, to: t.forward.in || 0, target: t.from, name: t.name, fallback: true };
  };

  Scenes.prototype.estimate = function (clip) {
    const v = this.player.get(clip.src);
    const d = this.player.dur(v) || 8;
    const a = clip.from === 'end' ? d : clip.from;
    const b = clip.to === 'end' ? d : clip.to;
    return Math.abs(b - a) / this.rate;
  };

  /* Bitta qadam. Band bo'lsa yoki chegarada bo'lsa, e'tiborsiz qoldiriladi. */
  Scenes.prototype.go = async function (dir) {
    if (this.state !== 'idle') return 'busy';
    const clip = this.clipFor(this.index, dir);
    if (!clip) {
      this.emit('sceneblocked', { scene: this.index, direction: dir > 0 ? 'forward' : 'backward' });
      return 'blocked';
    }
    const from = this.index, to = clip.target;
    this.state = 'transition';
    this.direction = dir > 0 ? 'forward' : 'backward';
    this.sync();
    this.emit('transitionstart', { from: from, to: to, direction: this.direction, name: clip.name, estimate: this.estimate(clip) });

    let result;
    try {
      result = await this.player.play(clip, this.rate);
    } catch (e) {
      console.error('[cine] transition failed', e);
      result = { mode: 'error', forced: true, error: String(e) };
    }

    this.index = to;
    this.state = 'idle';
    this.sync();
    this.emit('transitionend', { from: from, to: to, direction: this.direction, name: clip.name, result: result });
    this.emit('scenechange', { scene: to, id: this.cfg.scenes[to].id });
    return 'ok';
  };

  /* Menyudan: maqsadgacha har bir sahnadan o'tib boradi (sakrash yo'q). */
  Scenes.prototype.goTo = async function (target) {
    if (this.state !== 'idle') return 'busy';
    while (this.index !== target) {
      const r = await this.go(target > this.index ? 1 : -1);
      if (r !== 'ok') return r;
    }
    return 'ok';
  };

  C.Scenes = Scenes;
})();

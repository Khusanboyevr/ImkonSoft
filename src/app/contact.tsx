"use client";

import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { SectionGlow } from "@/components";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
      } else {
        setError(data.error || "Xabarni yuborishda xatolik yuz berdi. Qayta urinib ko&apos;ring.");
      }
    } catch (err) {
      setError("Tarmoq xatoligi! Internet aloqasini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-8 overflow-hidden"
      style={{ background: "var(--imk-bg-base)" }}
    >
      <SectionGlow tone="amber" size={560} top="-160px" right="-180px" />
      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-14">
          <Typography
            variant="h6"
            className="mb-2 tracking-widest uppercase text-xs font-semibold reveal-down"
            style={{ color: "var(--imk-glow-highlight)" }}
          >
            Biz bilan bog&apos;laning
          </Typography>
          <Typography
            variant="h2"
            className="font-display font-normal mb-4 reveal-up"
            style={{ color: "var(--imk-text-primary)", ["--imk-reveal-delay" as any]: "80ms" }}
          >
            Loyihangizni{" "}
            <span style={{ color: "var(--imk-glow-highlight)" }}>Muhokama Qilaylik</span>
          </Typography>
          <Typography
            variant="lead"
            className="lg:w-2/3 mx-auto reveal-up"
            style={{ color: "var(--imk-text-secondary)", ["--imk-reveal-delay" as any]: "160ms" }}
          >
            Yillar davomida to&apos;plangan tajriba va yuzlab muvaffaqiyatli loyihalar orqali biz mijozlarimizning ishonchini qozonib kelmoqdamiz. Biznesni avtomatlashtirish, dastur yaratish yoki konsultatsiya uchun — biz doim tayyor. Bepul maslahat uchun murojaat qiling!
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col gap-6 justify-center reveal-left">
            <div className="imk-card p-6" style={{ background: "var(--imk-bg-panel)" }}>
              <Typography variant="h6" className="mb-5 font-display font-normal" style={{ color: "var(--imk-text-primary)" }}>
                Aloqa Ma&apos;lumotlari
              </Typography>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,134,90,0.15)" }}>
                    <PhoneIcon className="h-5 w-5" style={{ color: "var(--imk-glow-mid)" }} />
                  </div>
                  <div>
                    <Typography variant="small" className="mb-0.5" style={{ color: "var(--imk-text-muted)" }}>Telefon</Typography>
                    <Typography className="font-semibold" style={{ color: "var(--imk-text-primary)" }}>+998 93 567 30 30</Typography>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,134,90,0.15)" }}>
                    <EnvelopeIcon className="h-5 w-5" style={{ color: "var(--imk-glow-mid)" }} />
                  </div>
                  <div>
                    <Typography variant="small" className="mb-0.5" style={{ color: "var(--imk-text-muted)" }}>Email</Typography>
                    <Typography className="font-semibold" style={{ color: "var(--imk-text-primary)" }}>info@imkonsoft.uz</Typography>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(232,134,90,0.15)" }}>
                    <MapPinIcon className="h-5 w-5" style={{ color: "var(--imk-glow-mid)" }} />
                  </div>
                  <div>
                    <Typography variant="small" className="mb-0.5" style={{ color: "var(--imk-text-muted)" }}>Manzil</Typography>
                    <Typography className="font-semibold" style={{ color: "var(--imk-text-primary)" }}>Farg&apos;ona viloyati, O&apos;zbekiston</Typography>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--imk-border-subtle)" }}>
                <Typography variant="small" className="mb-3" style={{ color: "var(--imk-text-muted)" }}>Ijtimoiy tarmoqlar</Typography>
                <div className="flex gap-3 flex-wrap">
                  {["Telegram", "Instagram", "LinkedIn"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="imk-pill-dark px-4 py-2 text-xs font-semibold"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="imk-card reveal-right p-6"
            style={{ background: "var(--imk-bg-panel)" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(232,134,90,0.15)" }}
                >
                  <CheckCircleIcon className="w-8 h-8" style={{ color: "var(--imk-glow-mid)" }} />
                </div>
                <Typography variant="h6" className="font-display font-normal mb-1.5" style={{ color: "var(--imk-text-primary)" }}>
                  Xabaringiz yuborildi!
                </Typography>
                <Typography className="text-sm" style={{ color: "var(--imk-text-secondary)" }}>
                  Tez orada mutaxassislarimiz siz bilan bog&apos;lanishadi.
                </Typography>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Typography variant="h6" className="font-display font-normal mb-1" style={{ color: "var(--imk-text-primary)" }}>
                  Murojaat Qoldiring
                </Typography>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block mb-1.5 text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: "var(--imk-text-muted)" }}
                  >
                    Ismingiz *
                  </label>
                  <input
                    id="contact-name"
                    className="imk-input"
                    placeholder="Ismingizni kiriting"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block mb-1.5 text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: "var(--imk-text-muted)" }}
                  >
                    Telefon raqam *
                  </label>
                  <input
                    id="contact-phone"
                    className="imk-input"
                    placeholder="+998 93 567 30 30"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block mb-1.5 text-[11px] font-semibold tracking-wider uppercase"
                    style={{ color: "var(--imk-text-muted)" }}
                  >
                    Xabar
                  </label>
                  <textarea
                    id="contact-message"
                    className="imk-input resize-none"
                    rows={3}
                    placeholder="Loyihangiz haqida qisqacha yozing..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {error && (
                  <Typography variant="small" className="text-center font-medium" style={{ color: "#f0847a" }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  className="rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-transform duration-150 active:scale-95 hover:-translate-y-0.5"
                  style={{ background: "var(--imk-cta-gradient)", color: "var(--imk-cta-text)" }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Yuborilmoqda...
                    </span>
                  ) : (
                    "Yuborish"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

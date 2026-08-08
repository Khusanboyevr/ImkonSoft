const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith("http")) loc = new URL(loc, url).href;
        return download(loc, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error("HTTP " + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(dest); });
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function main() {
  const outDir = path.join(__dirname, "public", "logos", "clients");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const logos = [
    { name: "najottalim", url: "https://najottalim.uz/brand/logo-central-white.svg", ext: "svg" },
    { name: "najottalim-icon", url: "https://najottalim.uz/icon.svg", ext: "svg" },
    { name: "astrum", url: "https://astrum.uz/images/logo.png", ext: "png" },
    { name: "click", url: "https://click.uz/click/images/logo.svg", ext: "svg" },
    { name: "payme-icon", url: "https://cdn.payme.uz/payme-logos/ico/p/1/apple-touch-icon.png", ext: "png" },
    { name: "humans", url: "https://humans.uz/app-icons/humans-preview.png", ext: "png" },
    { name: "uzcard-favicon", url: "https://uzcard.uz/favicon.ico", ext: "ico" },
  ];

  for (const l of logos) {
    const dest = path.join(outDir, l.name + "." + l.ext);
    try {
      await download(l.url, dest);
      const stat = fs.statSync(dest);
      console.log("OK:", l.name, "->", stat.size, "bytes");
    } catch (e) {
      console.log("FAIL:", l.name, "->", e.message);
    }
  }
}

main();

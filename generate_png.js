const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a 512x512 Circular PNG file for Reven Group logo
const width = 512;
const height = 512;

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcVal = crc32(buf.slice(4, 8 + len));
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

// 1. Signature
const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

// 2. IHDR
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // Bit depth
ihdrData[9] = 6; // Color type RGBA
ihdrData[10] = 0; // Compression method
ihdrData[11] = 0; // Filter method
ihdrData[12] = 0; // Interlace method
const ihdr = makeChunk('IHDR', ihdrData);

const rawData = Buffer.alloc(height * (1 + width * 4));

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const idx = y * (1 + width * 4) + 1 + x * 4;
  rawData[idx] = r;
  rawData[idx + 1] = g;
  rawData[idx + 2] = b;
  rawData[idx + 3] = a;
}

const cx = width / 2;
const cy = height / 2;
const radius = 246;
const ringThickness = 8;

// Fill image with transparent background outside circle, and dark teal inside circle
for (let y = 0; y < height; y++) {
  rawData[y * (1 + width * 4)] = 0; // Filter type 0
  for (let x = 0; x < width; x++) {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > radius + 1) {
      // Transparent outside
      setPixel(x, y, 0, 0, 0, 0);
    } else if (dist >= radius - ringThickness) {
      // Gold Ring Border
      const ringAlpha = Math.min(255, Math.max(0, Math.round((radius + 1 - dist) * 255)));
      setPixel(x, y, 213, 167, 84, ringAlpha);
    } else {
      // Inner Circle background #07222E
      const alpha = Math.min(255, Math.max(0, Math.round((radius - ringThickness - dist + 1) * 255)));
      const normDist = dist / radius;
      const r = Math.max(5, Math.round(11 - normDist * 6));
      const g = Math.max(25, Math.round(42 - normDist * 18));
      const b = Math.max(34, Math.round(56 - normDist * 22));
      setPixel(x, y, r, g, b, alpha);
    }
  }
}

// Render Mountain Mark & Ribbons using polygon rasterizer
function isInsidePoly(px, py, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1];
    const xj = points[j][0], yj = points[j][1];
    const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

const mainPeak = [
  [56, 302], [158, 245], [263, 174], [299, 140], [307, 146], [325, 202],
  [343, 161], [355, 171], [410, 271], [440, 320], [373, 302], [322, 240],
  [299, 174], [263, 205], [117, 276], [56, 302]
];

const innerShadow = [
  [299, 140], [294, 174], [263, 205], [117, 276], [56, 302],
  [110, 276], [240, 210], [294, 154]
];

const rightPeak = [
  [302, 240], [343, 161], [355, 171], [410, 271], [440, 320],
  [322, 294], [302, 240]
];

const ribbon1 = [
  [71, 317], [194, 307], [296, 296], [455, 338], [404, 344],
  [296, 322], [102, 330], [71, 317]
];

const ribbon2 = [
  [266, 307], [348, 307], [409, 355], [317, 373], [296, 363], [266, 307]
];

const goldR = 213, goldG = 167, goldB = 84;
const goldHighlightR = 247, goldHighlightG = 230, goldHighlightB = 189;
const goldShadowR = 170, goldShadowG = 119, goldShadowB = 40;
const bgCutoutR = 7, bgCutoutG = 34, bgCutoutB = 46;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const dx = x - cx;
    const dy = y - cy;
    if (Math.sqrt(dx * dx + dy * dy) > radius - ringThickness) continue;

    if (isInsidePoly(x, y, mainPeak)) {
      const gradRatio = Math.max(0, Math.min(1, (y - 140) / 180));
      const r = Math.round(goldHighlightR * (1 - gradRatio) + goldR * gradRatio);
      const g = Math.round(goldHighlightG * (1 - gradRatio) + goldG * gradRatio);
      const b = Math.round(goldHighlightB * (1 - gradRatio) + goldB * gradRatio);
      setPixel(x, y, r, g, b, 255);
    }
    
    if (isInsidePoly(x, y, innerShadow)) {
      setPixel(x, y, bgCutoutR, bgCutoutG, bgCutoutB, 255);
    }

    if (isInsidePoly(x, y, rightPeak)) {
      const gradRatio = Math.max(0, Math.min(1, (y - 160) / 160));
      const r = Math.round(goldR * (1 - gradRatio) + goldShadowR * gradRatio);
      const g = Math.round(goldG * (1 - gradRatio) + goldShadowG * gradRatio);
      const b = Math.round(goldB * (1 - gradRatio) + goldShadowB * gradRatio);
      setPixel(x, y, r, g, b, 255);
    }

    if (isInsidePoly(x, y, ribbon1)) {
      const gradRatio = Math.max(0, Math.min(1, x / width));
      const r = Math.round(goldHighlightR * (1 - gradRatio) + goldR * gradRatio);
      const g = Math.round(goldHighlightG * (1 - gradRatio) + goldG * gradRatio);
      const b = Math.round(goldHighlightB * (1 - gradRatio) + goldB * gradRatio);
      setPixel(x, y, r, g, b, 255);
    }

    if (isInsidePoly(x, y, ribbon2)) {
      setPixel(x, y, goldR, goldG, goldB, 255);
    }
  }
}

const compressed = zlib.deflateSync(rawData);
const idat = makeChunk('IDAT', compressed);
const iend = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([sig, ihdr, idat, iend]);
const pngPath = path.join(__dirname, 'public', 'image', 'logo.png');
fs.writeFileSync(pngPath, finalPng);
console.log('Successfully generated Circular PNG logo at:', pngPath);

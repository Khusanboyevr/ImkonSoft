const fs = require('fs');
const path = require('path');

// Generate 100% Circular SVG Logo for Reven Group
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7E6BD" />
      <stop offset="45%" stop-color="#D5A44C" />
      <stop offset="100%" stop-color="#AA7728" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0B2B38" />
      <stop offset="100%" stop-color="#051922" />
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7E6BD" />
      <stop offset="50%" stop-color="#D5A44C" />
      <stop offset="100%" stop-color="#885A18" />
    </linearGradient>
  </defs>
  
  <!-- Outer Clip & Circular Background -->
  <circle cx="500" cy="500" r="485" fill="url(#bgGrad)" />
  <circle cx="500" cy="500" r="475" fill="none" stroke="url(#ringGrad)" stroke-width="16" />

  <g transform="translate(0, 30)">
    <!-- Main Mountain Silhouette & Facets -->
    <path fill="url(#goldGrad)" d="
      M 110,590 
      C 150,575 220,530 310,480 
      C 400,430 450,370 515,340 
      C 550,325 570,290 585,275 
      C 590,270 595,275 600,285
      C 615,315 628,380 635,395
      C 642,380 655,330 670,315
      C 680,305 690,320 695,335
      C 715,385 755,440 800,530
      C 825,580 845,610 860,625
      L 730,590
      C 690,545 640,490 630,470
      C 610,430 590,380 585,340
      C 580,360 570,390 515,400
      C 450,410 330,470 230,540
      C 180,575 140,588 110,590
      Z
    " />

    <!-- Inner Shadow Cutout (the dark teal ridge line inside the mountain) -->
    <path fill="#07222E" d="
      M 585,275
      C 580,320 570,380 515,400
      C 450,410 330,470 230,540
      C 180,575 140,588 110,590
      C 140,588 175,570 215,540
      C 300,485 410,430 470,410
      C 520,395 555,360 575,300
      Z
    " />

    <!-- Additional Detail/Facet for Mountain Depth -->
    <path fill="url(#goldGrad)" d="
      M 590,470
      C 615,430 635,365 670,315
      C 680,305 690,320 695,335
      C 715,385 755,440 800,530
      C 825,580 845,610 860,625
      L 630,575
      C 600,560 585,510 590,470
      Z
    " opacity="0.95" />

    <!-- Dynamic Base Ribbon 1 (Upper curved horizon line) -->
    <path fill="url(#goldGrad)" d="
      M 140,620
      C 220,600 380,575 580,580
      C 720,585 820,630 890,660
      C 860,670 790,678 720,672
      C 580,660 380,630 200,645
      C 170,648 150,640 140,620
      Z
    " />

    <!-- Dynamic Base Ribbon 2 (Lower curved horizon accent) -->
    <path fill="url(#goldGrad)" d="
      M 520,600
      C 600,600 680,620 780,675
      C 810,690 800,700 780,705
      C 700,725 640,730 620,730
      C 610,730 600,725 580,710
      C 540,680 520,630 520,600
      Z
    " opacity="0.9" />
  </g>
</svg>`;

const svgPath = path.join(__dirname, 'public', 'image', 'logo.svg');
fs.writeFileSync(svgPath, svgContent, 'utf8');
console.log('Successfully generated Circular SVG logo at:', svgPath);

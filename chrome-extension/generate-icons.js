/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
// Node.js script to generate SVG + PNG icons in all required sizes.
// Run: node generate-icons.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const svgTemplate = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad1)"/>
  <text x="50%" y="50%" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">💰</text>
</svg>
`.trim();

const sizes = [16, 48, 128];

async function generateIcons() {
  for (const size of sizes) {
    const svgMarkup = svgTemplate(size);
    const svgPath = path.join(iconsDir, `icon${size}.svg`);
    const pngPath = path.join(iconsDir, `icon${size}.png`);

    fs.writeFileSync(svgPath, svgMarkup);
    console.log(`✓ Generated icon${size}.svg`);

    await sharp(Buffer.from(svgMarkup))
      .resize(size, size, { fit: 'contain' })
      .png()
      .toFile(pngPath);
    console.log(`✓ Generated icon${size}.png`);
  }

  console.log('\n✅ SVG & PNG icons generated successfully!');
  console.log('Files saved to chrome-extension/icons/');
}

generateIcons().catch((error) => {
  console.error('❌ Failed to generate icons:', error);
  process.exit(1);
});

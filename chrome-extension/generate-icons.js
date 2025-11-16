// Node.js script to generate PNG icons from SVG
// Run: node generate-icons.js

const fs = require('fs');
const path = require('path');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG template for icons
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

// Generate SVG files
const sizes = [16, 48, 128];
sizes.forEach(size => {
  const svg = svgTemplate(size);
  const filePath = path.join(iconsDir, `icon${size}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Generated icon${size}.svg`);
});

console.log('\n✅ SVG icons generated!');
console.log('📝 Note: To convert SVG to PNG, use an online converter or ImageMagick:');
console.log('   convert icon16.svg icon16.png');
console.log('   convert icon48.svg icon48.png');
console.log('   convert icon128.svg icon128.png');


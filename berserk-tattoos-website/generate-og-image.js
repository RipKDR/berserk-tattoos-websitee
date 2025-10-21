/**
 * Generate OG Image for Social Sharing
 * Brand: Berserk Tattoos Melbourne
 * Dimensions: 1200x630px (Facebook/Twitter standard)
 */

const sharp = require('sharp');

const width = 1200;
const height = 630;

// Brand colors
const bgColor = '#111111';
const accentColor = '#7B1113';
const textColor = '#FFFFFF';

// Create SVG with brand styling
const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient for depth -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
    
    <!-- Accent line gradient -->
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0" />
      <stop offset="50%" style="stop-color:${accentColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- Decorative accent lines -->
  <rect x="0" y="180" width="${width}" height="3" fill="url(#accent)" opacity="0.6"/>
  <rect x="0" y="450" width="${width}" height="3" fill="url(#accent)" opacity="0.6"/>
  
  <!-- Main heading -->
  <text 
    x="600" 
    y="280" 
    font-family="serif" 
    font-size="92" 
    font-weight="600"
    fill="${textColor}" 
    text-anchor="middle"
    letter-spacing="2">
    BERSERK TATTOOS
  </text>
  
  <!-- Subheading -->
  <text 
    x="600" 
    y="360" 
    font-family="sans-serif" 
    font-size="32" 
    font-weight="400"
    fill="${textColor}" 
    text-anchor="middle"
    opacity="0.9">
    Melbourne's Premier Custom Tattoo Studio
  </text>
  
  <!-- Location -->
  <text 
    x="600" 
    y="520" 
    font-family="sans-serif" 
    font-size="24" 
    font-weight="400"
    fill="${accentColor}" 
    text-anchor="middle">
    Heidelberg Heights • 33 Southern Road
  </text>
  
  <!-- Tagline -->
  <text 
    x="600" 
    y="560" 
    font-family="serif" 
    font-size="20" 
    font-style="italic"
    fill="${textColor}" 
    text-anchor="middle"
    opacity="0.7">
    Three Master Artists. One Relentless Pursuit of Perfection.
  </text>
</svg>
`;

// Generate the image
sharp(Buffer.from(svg))
  .png()
  .toFile('og-image.jpg')
  .then(() => {
    console.log('✅ OG image generated successfully: og-image.jpg');
    console.log('   Dimensions: 1200x630px');
    console.log('   Format: JPG (optimized for web)');
    console.log('   Location: berserk-tattoos-website/og-image.jpg');
  })
  .catch(err => {
    console.error('❌ Error generating OG image:', err);
    process.exit(1);
  });


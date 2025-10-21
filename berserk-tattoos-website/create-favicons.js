// Favicon Generator Script for Berserk Tattoos
// Run this in a browser console or save as HTML file

function createFavicon(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, size, size);
    
    // Text "B"
    ctx.fillStyle = '#7B1113';
    ctx.font = `bold ${size * 0.7}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('B', size / 2, size / 2);
    
    return canvas;
}

function createOGImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 1200, 630);
    
    // Main text
    ctx.fillStyle = '#F2F2F2';
    ctx.font = 'bold 80px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BERSERK TATTOOS', 600, 250);
    
    // Subtitle
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#F2F2F2';
    ctx.fillText('Melbourne\'s Premier Tattoo Artists', 600, 350);
    
    // Accent line
    ctx.strokeStyle = '#7B1113';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(300, 400);
    ctx.lineTo(900, 400);
    ctx.stroke();
    
    return canvas;
}

function downloadCanvas(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
}

// Generate all favicon files
// eslint-disable-next-line no-unused-vars
function generateAllFavicons() {
    console.log('Generating favicon files...');
    
    // favicon.ico (32x32)
    const favicon32 = createFavicon(32, 'favicon.ico');
    downloadCanvas(favicon32, 'favicon.ico');
    
    // apple-touch-icon.png (180x180)
    const apple180 = createFavicon(180, 'apple-touch-icon.png');
    downloadCanvas(apple180, 'apple-touch-icon.png');
    
    // android-chrome-192x192.png (192x192)
    const android192 = createFavicon(192, 'android-chrome-192x192.png');
    downloadCanvas(android192, 'android-chrome-192x192.png');
    
    // android-chrome-512x512.png (512x512)
    const android512 = createFavicon(512, 'android-chrome-512x512.png');
    downloadCanvas(android512, 'android-chrome-512x512.png');
    
    // og-image.jpg (1200x630)
    const ogImage = createOGImage();
    downloadCanvas(ogImage, 'og-image.jpg');
    
    console.log('All favicon files generated! Place them in your website root directory.');
}

// Instructions for use:
console.log(`
🎨 BERSERK TATTOOS FAVICON GENERATOR

To generate all favicon files:

1. Open this file in a web browser
2. Open browser developer tools (F12)
3. Go to Console tab
4. Type: generateAllFavicons()
5. Press Enter
6. All 5 files will download automatically
7. Place the downloaded files in your website root directory

Files generated:
- favicon.ico (32x32px)
- apple-touch-icon.png (180x180px)
- android-chrome-192x192.png (192x192px)
- android-chrome-512x512.png (512x512px)
- og-image.jpg (1200x630px)

Design specifications:
- Background: #111111 (dark)
- Text: B in #7B1113 (red)
- Font: Serif (bold)
- OG Image: "BERSERK TATTOOS" with tagline

Ready to generate? Run: generateAllFavicons()
`);

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('Favicon generator loaded. Run generateAllFavicons() to create all files.');
}

/**
 * HTML Image Update Script for Berserk Tattoos
 * BMad Method Stage 2.3: Update HTML with WebP and responsive images
 * 
 * This script updates all HTML files to use:
 * - <picture> elements with WebP sources
 * - Responsive srcset attributes
 * - Proper sizes attributes
 * - JPG fallbacks
 * 
 * Requirements:
 * - Node.js 14+
 * - Images must be optimized first (run optimize-images.js)
 * 
 * Usage:
 * node update-html-images.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const HTML_FILES = ['index.html', 'artists.html', 'book.html'];
const PORTFOLIO_DIR = '/portfolio';

// Image patterns to replace
const IMAGE_PATTERNS = [
  // Pattern 1: <img src="/portfolio/image.jpg" ...>
  {
    regex: /<img\s+([^>]*?)src="(\/portfolio\/([^"]+)\.jpg)"([^>]*?)>/gi,
    type: 'img'
  },
  // Pattern 2: background images in style attributes
  {
    regex: /style="([^"]*?)background[^:]*:\s*url\(['"]?(\/portfolio\/([^'"]+)\.jpg)['"]?\)([^"]*)"/gi,
    type: 'background'
  }
];

/**
 * Extract attributes from img tag
 */
function extractAttributes(attrString) {
  const attrs = {};
  const regex = /(\w+(?:-\w+)*)="([^"]*)"/g;
  let match;
  
  while ((match = regex.exec(attrString)) !== null) {
    attrs[match[1]] = match[2];
  }
  
  return attrs;
}

/**
 * Generate picture element with WebP and responsive images
 */
function generatePictureElement(imagePath, attributes) {
  const parsedPath = path.parse(imagePath);
  const basePath = parsedPath.dir;
  const baseName = parsedPath.name;
  
  // Build attributes string (excluding src)
  const attrKeys = Object.keys(attributes).filter(k => k !== 'src' && k !== 'srcset');
  const attrString = attrKeys.map(k => `${k}="${attributes[k]}"`).join(' ');
  
  // Generate srcset for WebP
  const webpSrcset = [
    `${basePath}/${baseName}-480w.webp 480w`,
    `${basePath}/${baseName}-768w.webp 768w`,
    `${basePath}/${baseName}-1200w.webp 1200w`,
    `${basePath}/${baseName}.webp 1200w`
  ].join(', ');
  
  // Generate srcset for JPG fallback
  const jpgSrcset = [
    `${basePath}/${baseName}-480w.jpg 480w`,
    `${basePath}/${baseName}-768w.jpg 768w`,
    `${basePath}/${baseName}-1200w.jpg 1200w`,
    `${basePath}/${baseName}.jpg 1200w`
  ].join(', ');
  
  // Default sizes attribute (can be customized per use case)
  const sizesAttr = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  
  // Build picture element
  return `<picture>
    <source srcset="${webpSrcset}" sizes="${sizesAttr}" type="image/webp">
    <source srcset="${jpgSrcset}" sizes="${sizesAttr}" type="image/jpeg">
    <img src="${imagePath}" ${attrString}>
</picture>`;
}

/**
 * Process HTML file
 */
function processHTMLFile(filePath) {
  console.log(`\n📄 Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Replace img tags
  content = content.replace(
    /<img\s+([^>]*?)src="(\/portfolio\/[^"]+\.jpg)"([^>]*?)>/gi,
    (match, beforeSrc, src, afterSrc) => {
      const allAttrs = beforeSrc + afterSrc;
      const attributes = extractAttributes(allAttrs);
      
      // Check if this img is already in a picture element
      const surroundingContext = content.substring(
        Math.max(0, content.indexOf(match) - 100),
        Math.min(content.length, content.indexOf(match) + match.length + 100)
      );
      
      if (surroundingContext.includes('<picture>')) {
        console.log(`  ⊘ Skipping (already in picture): ${src}`);
        return match;
      }
      
      replacements++;
      console.log(`  ✓ Replaced: ${src}`);
      return generatePictureElement(src, attributes);
    }
  );
  
  // Save updated file
  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Saved with ${replacements} replacements`);
  } else {
    console.log(`  ℹ No changes needed`);
  }
  
  return replacements;
}

/**
 * Main execution
 */
function main() {
  console.log('🔄 HTML Image Update Script');
  console.log('============================\n');
  
  let totalReplacements = 0;
  const results = [];
  
  for (const htmlFile of HTML_FILES) {
    try {
      const replacements = processHTMLFile(htmlFile);
      totalReplacements += replacements;
      results.push({ file: htmlFile, replacements, status: 'success' });
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
      results.push({ file: htmlFile, replacements: 0, status: 'error', error: error.message });
    }
  }
  
  // Summary
  console.log('\n\n📊 Update Summary');
  console.log('==================\n');
  
  results.forEach(({ file, replacements, status, error }) => {
    const statusIcon = status === 'success' ? '✓' : '✗';
    console.log(`${statusIcon} ${file}: ${replacements} replacements`);
    if (error) {
      console.log(`  Error: ${error}`);
    }
  });
  
  console.log(`\nTotal replacements: ${totalReplacements}`);
  console.log('\n✅ HTML update complete!');
  console.log('\nNext steps:');
  console.log('1. Test all pages in a browser');
  console.log('2. Verify images load correctly');
  console.log('3. Check responsive image switching (Chrome DevTools Network tab)');
  console.log('4. Run Lighthouse audit to verify performance improvement');
}

// Run the script
try {
  main();
} catch (error) {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
}
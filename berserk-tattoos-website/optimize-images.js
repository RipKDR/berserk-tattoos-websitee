/**
 * Image Optimization Script for Berserk Tattoos
 * BMad Method Stage 2: Image Compression
 * 
 * This script:
 * 1. Compresses all JPG images (85% quality, mozjpeg)
 * 2. Generates WebP variants (80% quality)
 * 3. Creates responsive sizes (480w, 768w, 1200w)
 * 4. Generates WebP for all responsive sizes
 * 
 * Requirements:
 * - Node.js 14+ installed
 * - Run: npm install sharp --save-dev
 * 
 * Usage:
 * node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = './portfolio';
const BACKUP_DIR = './portfolio-backup';
const OUTPUT_DIR = './portfolio';
const RESPONSIVE_SIZES = [480, 768, 1200];

// Quality settings
const JPG_QUALITY = 85;
const WEBP_QUALITY = 80;

// Stats tracking
const stats = {
  originalSize: 0,
  compressedSize: 0,
  filesProcessed: 0,
  errors: []
};

/**
 * Create backup directory if it doesn't exist
 */
function ensureBackupDir() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`✓ Created backup directory: ${BACKUP_DIR}`);
  }
}

/**
 * Get all JPG files from source directory
 */
function getImageFiles() {
  return fs.readdirSync(SOURCE_DIR)
    .filter(file => /\.(jpg|jpeg)$/i.test(file))
    .map(file => path.join(SOURCE_DIR, file));
}

/**
 * Backup original image
 */
function backupImage(filePath) {
  const fileName = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, fileName);
  
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    const stats = fs.statSync(filePath);
    return stats.size;
  }
  return 0;
}

/**
 * Compress JPG image
 */
async function compressJPG(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .jpeg({
        quality: JPG_QUALITY,
        mozjpeg: true,
        progressive: true
      })
      .toFile(outputPath + '.tmp');
    
    // Replace original with compressed
    fs.renameSync(outputPath + '.tmp', outputPath);
    
    const outputStats = fs.statSync(outputPath);
    return outputStats.size;
  } catch (error) {
    throw new Error(`JPG compression failed: ${error.message}`);
  }
}

/**
 * Generate WebP variant
 */
async function generateWebP(inputPath) {
  const parsedPath = path.parse(inputPath);
  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);
  
  try {
    await sharp(inputPath)
      .webp({
        quality: WEBP_QUALITY,
        effort: 6
      })
      .toFile(outputPath);
    
    const outputStats = fs.statSync(outputPath);
    console.log(`  ✓ Generated WebP: ${path.basename(outputPath)} (${(outputStats.size / 1024).toFixed(1)} KB)`);
    return outputStats.size;
  } catch (error) {
    throw new Error(`WebP generation failed: ${error.message}`);
  }
}

/**
 * Generate responsive image sizes
 */
async function generateResponsiveSizes(inputPath) {
  const parsedPath = path.parse(inputPath);
  const sizes = [];
  
  for (const width of RESPONSIVE_SIZES) {
    // Generate JPG
    const jpgOutput = path.join(parsedPath.dir, `${parsedPath.name}-${width}w.jpg`);
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: JPG_QUALITY,
        mozjpeg: true,
        progressive: true
      })
      .toFile(jpgOutput);
    
    const jpgStats = fs.statSync(jpgOutput);
    sizes.push({ format: 'JPG', width, size: jpgStats.size, path: jpgOutput });
    
    // Generate WebP
    const webpOutput = path.join(parsedPath.dir, `${parsedPath.name}-${width}w.webp`);
    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: WEBP_QUALITY,
        effort: 6
      })
      .toFile(webpOutput);
    
    const webpStats = fs.statSync(webpOutput);
    sizes.push({ format: 'WebP', width, size: webpStats.size, path: webpOutput });
  }
  
  return sizes;
}

/**
 * Process a single image
 */
async function processImage(imagePath) {
  const fileName = path.basename(imagePath);
  console.log(`\n📸 Processing: ${fileName}`);
  
  try {
    // Backup original
    const originalSize = backupImage(imagePath);
    stats.originalSize += originalSize;
    console.log(`  ✓ Backed up (${(originalSize / 1024).toFixed(1)} KB)`);
    
    // Compress JPG
    const compressedSize = await compressJPG(imagePath, imagePath);
    stats.compressedSize += compressedSize;
    const savingsPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    console.log(`  ✓ Compressed JPG (${(compressedSize / 1024).toFixed(1)} KB, ${savingsPercent}% savings)`);
    
    // Generate WebP
    await generateWebP(imagePath);
    
    // Generate responsive sizes
    console.log(`  ⚙️  Generating responsive sizes...`);
    const responsiveSizes = await generateResponsiveSizes(imagePath);
    console.log(`  ✓ Generated ${responsiveSizes.length} responsive variants`);
    
    stats.filesProcessed++;
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    stats.errors.push({ file: fileName, error: error.message });
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Berserk Tattoos Image Optimization');
  console.log('=====================================\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Backup: ${BACKUP_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Responsive sizes: ${RESPONSIVE_SIZES.join(', ')}px\n`);
  
  // Ensure backup directory exists
  ensureBackupDir();
  
  // Get all image files
  const imageFiles = getImageFiles();
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  // Process each image
  const startTime = Date.now();
  
  for (const imagePath of imageFiles) {
    await processImage(imagePath);
  }
  
  // Calculate final statistics
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  const totalSavings = stats.originalSize - stats.compressedSize;
  const savingsPercent = ((totalSavings / stats.originalSize) * 100).toFixed(1);
  
  // Print summary
  console.log('\n\n📊 Optimization Summary');
  console.log('========================\n');
  console.log(`Files processed: ${stats.filesProcessed}/${imageFiles.length}`);
  console.log(`Original size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Compressed size: ${(stats.compressedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${savingsPercent}%)`);
  console.log(`Processing time: ${duration}s`);
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️  Errors encountered: ${stats.errors.length}`);
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✅ Optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Review optimized images visually');
  console.log('2. Run: node update-html-images.js');
  console.log('3. Test website locally');
  console.log('4. If satisfied, delete portfolio-backup/');
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});


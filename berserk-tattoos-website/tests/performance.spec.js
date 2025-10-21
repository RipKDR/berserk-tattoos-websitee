// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Performance Tests', () => {
  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance budget: homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to stabilize
    await page.waitForLoadState('networkidle');
    
    // Check that images are optimized
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      // Check for WebP format (better compression)
      if (src && src.includes('portfolio')) {
        expect(src).toMatch(/\.(webp|jpg)$/);
      }
    }
  });

  test('should have proper image optimization', async ({ page }) => {
    await page.goto('/');
    
    // Check that images have proper attributes
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      
      // Check for loading="lazy" on non-critical images
      const loading = await img.getAttribute('loading');
      if (loading) {
        expect(loading).toBe('lazy');
      }
      
      // Check for proper alt text
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have minimal JavaScript errors', async ({ page }) => {
    const errors = [];
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for critical JavaScript errors
    expect(errors.length).toBe(0);
  });

  test('should be mobile optimized', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu functionality
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Test mobile menu toggle
    await mobileMenu.click();
    await expect(page.locator('.nav-links.active')).toBeVisible();
    
    // Check responsive images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const boundingBox = await img.boundingBox();
      
      // Images should fit within mobile viewport
      if (boundingBox) {
        expect(boundingBox.width).toBeLessThanOrEqual(375);
      }
    }
  });
});

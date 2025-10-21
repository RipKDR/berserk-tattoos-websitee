// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Berserk Tattoos Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Berserk Tattoos/);
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('BERSERK');
    
    // Check navigation is visible
    await expect(page.locator('.nav-container')).toBeVisible();
    
    // Check logo is present
    await expect(page.locator('.logo')).toContainText('BERSERK');
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation links
    await expect(page.locator('a[href="#artists"]')).toBeVisible();
    await expect(page.locator('a[href="#gallery"]')).toBeVisible();
    await expect(page.locator('a[href="book.html"]')).toBeVisible();
    await expect(page.locator('a[href="aftercare.html"]')).toBeVisible();
    await expect(page.locator('a[href="#testimonials"]')).toBeVisible();
    await expect(page.locator('a[href="#contact"]')).toBeVisible();
  });

  test('should display artist cards', async ({ page }) => {
    await page.goto('/');
    
    // Check artists section
    await expect(page.locator('#artists')).toBeVisible();
    
    // Check artist cards are present
    const artistCards = page.locator('.artist-card');
    await expect(artistCards).toHaveCount(3);
    
    // Check artist names
    await expect(page.locator('.artist-name')).toContainText(['Amelia Kelso', 'Ben White Raven', 'Monique Moore']);
  });

  test('should have working gallery section', async ({ page }) => {
    await page.goto('/');
    
    // Check gallery section
    await expect(page.locator('#gallery')).toBeVisible();
    
    // Check gallery items are present
    const galleryItems = page.locator('.gallery-item');
    await expect(galleryItems).toHaveCountGreaterThan(0);
  });

  test('should have contact information', async ({ page }) => {
    await page.goto('/');
    
    // Check contact section
    await expect(page.locator('#contact')).toBeVisible();
    
    // Check contact cards
    const contactCards = page.locator('.contact-card');
    await expect(contactCards).toHaveCount(4);
    
    // Check contact details
    await expect(page.locator('text=33 Southern Road')).toBeVisible();
    await expect(page.locator('text=0478 128 212')).toBeVisible();
    await expect(page.locator('text=berserk.tattoos.au@gmail.com')).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check mobile menu is present
    await expect(page.locator('.mobile-menu')).toBeVisible();
    
    // Check hero section adapts
    await expect(page.locator('.hero')).toBeVisible();
    
    // Check navigation adapts
    await expect(page.locator('.nav-links')).not.toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Melbourne.*tattoo/i);
    
    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Berserk Tattoos/);
    await expect(page.locator('meta[property="og:description"]')).toBeVisible();
    
    // Check canonical URL
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://berserktattoos.com/');
  });

  test('should have working CTA buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check main CTA buttons
    const bookButton = page.locator('a[href="book.html"]').first();
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toContainText('BOOK');
    
    const artistsButton = page.locator('a[href="#artists"]').first();
    await expect(artistsButton).toBeVisible();
  });

  test('should load images properly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Check that images are loaded (not broken)
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
    }
  });

  test('should have proper accessibility features', async ({ page }) => {
    await page.goto('/');
    
    // Check skip link
    await expect(page.locator('.skip-link')).toBeVisible();
    
    // Check proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});

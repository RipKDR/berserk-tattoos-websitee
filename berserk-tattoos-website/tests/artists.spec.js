// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Artists Page', () => {
  test('should load artists page successfully', async ({ page }) => {
    await page.goto('/artists.html');
    
    // Check page loads
    await expect(page).toHaveTitle(/Artists.*Berserk/i);
    
    // Check artists are displayed
    await expect(page.locator('.artist-card')).toHaveCount(3);
  });

  test('should display artist portfolios', async ({ page }) => {
    await page.goto('/artists.html');
    
    // Check each artist section
    await expect(page.locator('#amelia')).toBeVisible();
    await expect(page.locator('#ben')).toBeVisible();
    await expect(page.locator('#monique')).toBeVisible();
    
    // Check artist names
    await expect(page.locator('text=Amelia Kelso')).toBeVisible();
    await expect(page.locator('text=Ben White Raven')).toBeVisible();
    await expect(page.locator('text=Monique Moore')).toBeVisible();
  });

  test('should have artist portfolio images', async ({ page }) => {
    await page.goto('/artists.html');
    
    // Check portfolio images load
    const portfolioImages = page.locator('.portfolio-item img');
    await expect(portfolioImages).toHaveCountGreaterThan(0);
    
    // Check images are visible
    const imageCount = await portfolioImages.count();
    for (let i = 0; i < imageCount; i++) {
      await expect(portfolioImages.nth(i)).toBeVisible();
    }
  });

  test('should have booking links for each artist', async ({ page }) => {
    await page.goto('/artists.html');
    
    // Check booking buttons/links for each artist
    const bookingLinks = page.locator('a[href*="book"]');
    await expect(bookingLinks).toHaveCountGreaterThan(0);
  });
});

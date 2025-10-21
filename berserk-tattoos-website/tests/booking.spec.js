// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Booking Page', () => {
  test('should load booking page successfully', async ({ page }) => {
    await page.goto('/book.html');
    
    // Check page loads without errors
    await expect(page).toHaveTitle(/Book.*Berserk/i);
    
    // Check booking form is present
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have booking form fields', async ({ page }) => {
    await page.goto('/book.html');
    
    // Check form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    
    // Check artist selection
    await expect(page.locator('select[name="artist"]')).toBeVisible();
    
    // Check submit button
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/book.html');
    
    // Try to submit without filling required fields
    await page.click('button[type="submit"]');
    
    // Check validation messages appear
    await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('should allow artist selection', async ({ page }) => {
    await page.goto('/book.html');
    
    // Check artist options
    const artistSelect = page.locator('select[name="artist"]');
    await expect(artistSelect).toBeVisible();
    
    // Check that all three artists are options
    const options = artistSelect.locator('option');
    await expect(options).toHaveCount(4); // 3 artists + placeholder
  });
});

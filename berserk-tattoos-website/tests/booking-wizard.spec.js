/**
 * Booking Wizard E2E Tests for Berserk Tattoos
 * BMAD Optimization - Phase 4.1
 * 
 * Comprehensive test suite for the 5-step booking wizard
 * Tests all critical user flows and edge cases
 */

const { test, expect } = require('@playwright/test');

test.describe('Booking Wizard - Complete Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book.html');
    await page.waitForLoadState('networkidle');
  });

  test('should display all 5 wizard steps', async ({ page }) => {
    // Check progress bar is visible
    await expect(page.locator('.progress-bar')).toBeVisible();
    
    // Check progress steps
    const progressSteps = page.locator('.progress-step');
    await expect(progressSteps).toHaveCount(5);
    
    // Check wizard steps
    const wizardSteps = page.locator('.wizard-step');
    await expect(wizardSteps).toHaveCount(5);
    
    // Only first step should be active initially
    await expect(page.locator('.wizard-step[data-step="1"]')).toHaveClass(/active/);
  });

  test('should navigate through all steps', async ({ page }) => {
    // Step 1: Consultation Type Selection
    await expect(page.locator('.consultation-option')).toHaveCount(2);
    
    // Select phone consultation
    await page.click('.consultation-option[data-consultation="phone"]');
    await expect(page.locator('.consultation-option[data-consultation="phone"]')).toHaveClass(/selected/);
    
    // Select artist
    await page.click('.artist-card[data-artist-id="amelia"]');
    await expect(page.locator('.artist-card[data-artist-id="amelia"]')).toHaveClass(/selected/);
    
    // Move to step 2
    await page.click('.wizard-btn-next');
    await expect(page.locator('.wizard-step[data-step="2"]')).toHaveClass(/active/);
    
    // Step 2: Personal Details
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '0412345678');
    
    // Move to step 3
    await page.click('.wizard-btn-next');
    await expect(page.locator('.wizard-step[data-step="3"]')).toHaveClass(/active/);
    
    // Step 3: Design Details
    await page.selectOption('select[name="placement"]', 'arm');
    await page.selectOption('select[name="size"]', 'medium');
    await page.fill('textarea[name="description"]', 'A beautiful rose tattoo');
    
    // Move to step 4
    await page.click('.wizard-btn-next');
    await expect(page.locator('.wizard-step[data-step="4"]')).toHaveClass(/active/);
    
    // Step 4: Appointment Scheduling
    await page.fill('input[name="appointmentDate"]', '2025-12-01');
    await page.fill('input[name="appointmentTime"]', '14:00');
    
    // Move to step 5
    await page.click('.wizard-btn-next');
    await expect(page.locator('.wizard-step[data-step="5"]')).toHaveClass(/active/);
    
    // Step 5: Review & Submit
    await expect(page.locator('.booking-summary')).toBeVisible();
    await expect(page.locator('[data-summary="artist"]')).toContainText('Amelia');
    await expect(page.locator('[data-summary="firstName"]')).toContainText('John');
  });

  test('should validate required fields at each step', async ({ page }) => {
    // Try to proceed without selecting consultation type
    await page.click('.wizard-btn-next');
    await expect(page.locator('.wizard-error')).toBeVisible();
    
    // Select consultation type and artist
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    // Try to proceed without filling personal details
    await page.click('.wizard-btn-next');
    await expect(page.locator('input[name="firstName"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('should persist form data across page reloads', async ({ page }) => {
    // Fill out form partially
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    await page.fill('input[name="firstName"]', 'Jane');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="email"]', 'jane.smith@example.com');
    
    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Check data is restored
    await expect(page.locator('input[name="firstName"]')).toHaveValue('Jane');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('Smith');
    await expect(page.locator('input[name="email"]')).toHaveValue('jane.smith@example.com');
  });

  test('should handle back navigation correctly', async ({ page }) => {
    // Complete step 1
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    // Complete step 2
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0412345678');
    await page.click('.wizard-btn-next');
    
    // Go back to step 1
    await page.click('.wizard-btn-prev');
    await expect(page.locator('.wizard-step[data-step="1"]')).toHaveClass(/active/);
    
    // Check selections are preserved
    await expect(page.locator('.consultation-option[data-consultation="phone"]')).toHaveClass(/selected/);
    await expect(page.locator('.artist-card[data-artist-id="amelia"]')).toHaveClass(/selected/);
  });

  test('should update price estimate based on size selection', async ({ page }) => {
    // Complete steps 1-2
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0412345678');
    await page.click('.wizard-btn-next');
    
    // Test different size selections
    await page.selectOption('select[name="size"]', 'small');
    await expect(page.locator('[data-summary="price"]')).toContainText('$500 - $1,000');
    
    await page.selectOption('select[name="size"]', 'large');
    await expect(page.locator('[data-summary="price"]')).toContainText('$2,500 - $5,000');
  });

  test('should handle consultation fee display correctly', async ({ page }) => {
    // Test phone consultation (free)
    await page.click('.consultation-option[data-consultation="phone"]');
    await expect(page.locator('#consultation-fee-display')).toContainText('$0.00');
    await expect(page.locator('#credit-note')).not.toBeVisible();
    
    // Test in-person consultation ($100)
    await page.click('.consultation-option[data-consultation="in-person"]');
    await expect(page.locator('#consultation-fee-display')).toContainText('$100.00');
    await expect(page.locator('#credit-note')).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    // Complete entire form
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0412345678');
    await page.click('.wizard-btn-next');
    
    await page.selectOption('select[name="placement"]', 'arm');
    await page.selectOption('select[name="size"]', 'medium');
    await page.fill('textarea[name="description"]', 'Test tattoo');
    await page.click('.wizard-btn-next');
    
    await page.fill('input[name="appointmentDate"]', '2025-12-01');
    await page.fill('input[name="appointmentTime"]', '14:00');
    await page.click('.wizard-btn-next');
    
    // Mock the booking submission to test loading state
    await page.route('**/.netlify/functions/create-booking', route => {
      // Simulate slow response
      setTimeout(() => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            bookingId: 'BT-TEST-123',
            stripeUrl: 'https://checkout.stripe.com/test'
          })
        });
      }, 1000);
    });
    
    // Submit booking
    await page.click('.wizard-btn-complete');
    
    // Check loading state
    await expect(page.locator('.wizard-loading')).toHaveClass(/active/);
    await expect(page.locator('.wizard-btn-complete')).toBeDisabled();
    await expect(page.locator('.wizard-btn-complete')).toContainText('Processing...');
  });

  test('should handle submission errors gracefully', async ({ page }) => {
    // Complete entire form
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0412345678');
    await page.click('.wizard-btn-next');
    
    await page.selectOption('select[name="placement"]', 'arm');
    await page.selectOption('select[name="size"]', 'medium');
    await page.fill('textarea[name="description"]', 'Test tattoo');
    await page.click('.wizard-btn-next');
    
    await page.fill('input[name="appointmentDate"]', '2025-12-01');
    await page.fill('input[name="appointmentTime"]', '14:00');
    await page.click('.wizard-btn-next');
    
    // Mock error response
    await page.route('**/.netlify/functions/create-booking', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Booking submission failed',
          message: 'Server error'
        })
      });
    });
    
    // Submit booking
    await page.click('.wizard-btn-complete');
    
    // Check error message appears
    await expect(page.locator('.wizard-error')).toBeVisible();
    await expect(page.locator('.wizard-error')).toContainText('error processing your booking');
    
    // Check loading state is cleared
    await expect(page.locator('.wizard-loading')).not.toHaveClass(/active/);
    await expect(page.locator('.wizard-btn-complete')).not.toBeDisabled();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test arrow key navigation
    await page.press('body', 'ArrowRight');
    // Should not advance without selections
    
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    
    await page.press('body', 'ArrowRight');
    await expect(page.locator('.wizard-step[data-step="2"]')).toHaveClass(/active/);
    
    await page.press('body', 'ArrowLeft');
    await expect(page.locator('.wizard-step[data-step="1"]')).toHaveClass(/active/);
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile-specific elements
    await expect(page.locator('.booking-wizard')).toBeVisible();
    await expect(page.locator('.progress-bar')).toBeVisible();
    
    // Test touch interactions
    await page.click('.consultation-option[data-consultation="phone"]');
    await expect(page.locator('.consultation-option[data-consultation="phone"]')).toHaveClass(/selected/);
  });
});

test.describe('Booking Wizard - Accessibility', () => {
  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/book.html');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('.consultation-option[data-consultation="phone"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('.consultation-option[data-consultation="in-person"]')).toBeFocused();
    
    // Test Enter key activation
    await page.keyboard.press('Enter');
    await expect(page.locator('.consultation-option[data-consultation="in-person"]')).toHaveClass(/selected/);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/book.html');
    
    // Check ARIA labels on form elements
    await expect(page.locator('input[name="firstName"]')).toHaveAttribute('aria-label');
    await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-label');
    
    // Check progress indicators
    await expect(page.locator('.progress-bar')).toHaveAttribute('aria-label');
    await expect(page.locator('.progress-step')).toHaveAttribute('aria-label');
  });

  test('should announce step changes to screen readers', async ({ page }) => {
    await page.goto('/book.html');
    
    // Complete step 1
    await page.click('.consultation-option[data-consultation="phone"]');
    await page.click('.artist-card[data-artist-id="amelia"]');
    await page.click('.wizard-btn-next');
    
    // Check step 2 is properly announced
    await expect(page.locator('.wizard-step[data-step="2"]')).toHaveAttribute('aria-live', 'polite');
  });
});

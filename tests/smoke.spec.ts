import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Layout and Smooth Scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for loading screen to disappear
    await page.waitForSelector('.app.opacity-100', { timeout: 60000 });
  });

  test('Hero section has 90vw container layout', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    
    // Check if hero content is centered and has proper width
    const content = page.locator('.hero-content');
    const box = await content.boundingBox();
    const viewport = page.viewportSize();
    
    if (box && viewport) {
      // 90vw check (approximate)
      expect(box.width).toBeGreaterThan(viewport.width * 0.8);
      expect(box.width).toBeLessThan(viewport.width * 0.95);
    }
  });

  test('Smooth scroll is active', async ({ page }) => {
    // Check for data-lenis attribute on parallax elements
    const parallax = page.locator('[data-lenis="active"]').first();
    await expect(parallax).toBeAttached();
  });

  test('Video scrubbing element exists', async ({ page }) => {
    const video = page.locator('.hero-video');
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute('muted', '');
    await expect(video).toHaveAttribute('playsinline', '');
  });
});

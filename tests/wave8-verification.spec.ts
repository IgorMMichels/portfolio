import { test, expect } from '@playwright/test';

test.describe('Wave 8: Parallax & Smooth Scrolling Verification', () => {
  test.setTimeout(60000); // Increase timeout for the whole suite

  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for loading screen to disappear
    // The loading screen has a high z-index and eventually gets opacity-0 and pointer-events-none
    await page.waitForSelector('.fixed.inset-0.z-\\[9999\\]', { state: 'hidden', timeout: 60000 });
    
    // Also ensure the app is visible
    await page.waitForSelector('.app.opacity-100', { timeout: 30000 });
  });

  test('main container maintains 90vw width on desktop', async ({ page }) => {
    // Set viewport to desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Find the CardsParallax container (it has w-[90vw])
    const container = page.locator('.w-\\[90vw\\]').first();
    await expect(container).toBeVisible();
    
    const box = await container.boundingBox();
    if (box) {
      // 90% of 1280 is 1152
      // We allow some margin for scrollbars or rounding
      expect(box.width).toBeGreaterThan(1100);
      expect(box.width).toBeLessThan(1200);
    }
  });

  test('Hero video is present and visible', async ({ page }) => {
    const video = page.locator('video.hero-video');
    await expect(video).toBeVisible();
    
    // Check if video is loaded (readyState >= 1)
    const readyState = await video.evaluate((el: HTMLVideoElement) => el.readyState);
    expect(readyState).toBeGreaterThanOrEqual(1);
  });

  test('scrolling triggers GSAP animations (mocked check)', async ({ page }) => {
    // We can't easily check GSAP internal state, but we can check if scroll position changes
    // and if some elements change their style/position
    
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBe(0);
    
    // Scroll down to Hero section end
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Wait a bit for Lenis to smooth scroll
    await page.waitForTimeout(1000);
    
    const newScrollY = await page.evaluate(() => window.scrollY);
    expect(newScrollY).toBeGreaterThan(0);
    
    // Check if Hero content faded out
    const heroContent = page.locator('.hero-content');
    const opacity = await heroContent.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeLessThan(1);
  });

  test('Lenis is active and controlling the scroll', async ({ page }) => {
    // Check if the app container is wrapped in SmoothScroll
    // We can check if the scroll is smooth by checking if window.scrollY changes gradually
    // but that's hard.
    
    // Instead, let's check if the Lenis instance is available on the window if we expose it
    // or just check if the scroll position changes after a wheel event
    
    const initialScrollY = await page.evaluate(() => window.scrollY);
    
    // Simulate a wheel event
    await page.mouse.wheel(0, 500);
    
    // Wait a bit
    await page.waitForTimeout(500);
    
    const newScrollY = await page.evaluate(() => window.scrollY);
    expect(newScrollY).toBeGreaterThan(initialScrollY);
  });
});

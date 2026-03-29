import { test, expect } from '@playwright/test';

test('ParallaxDemo scroll triggers GSAP animation', async ({ page }) => {
  // Go to the app
  await page.goto('http://localhost:5173');

  // Wait for the loading screen to disappear
  await page.waitForSelector('.app.opacity-100', { timeout: 15000 });

  // Find the ParallaxDemo section
  const parallaxSection = page.locator('text=Parallax Demo').locator('..');
  await expect(parallaxSection).toBeVisible();

  // Get the box element inside ParallaxDemo
  const box = parallaxSection.locator('div').first();
  
  // Get initial transform
  const initialTransform = await box.evaluate((el) => window.getComputedStyle(el).transform);

  // Scroll down to trigger the parallax effect
  await page.evaluate(() => window.scrollBy(0, 500));
  
  // Wait a bit for Lenis and GSAP to update
  await page.waitForTimeout(500);

  // Get new transform
  const newTransform = await box.evaluate((el) => window.getComputedStyle(el).transform);

  // The transform should have changed due to GSAP ScrollTrigger
  expect(newTransform).not.toBe(initialTransform);
});

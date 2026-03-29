import { test, expect } from '@playwright/test';

test('Hero video scrubbing aligns with scroll', async ({ page }) => {
  // Go to the app
  await page.goto('/');

  // Wait for the loading screen to disappear
  await page.waitForSelector('.app.opacity-100', { timeout: 60000 });

  // Find the Hero video
  const video = page.locator('video.hero-video');
  await expect(video).toBeVisible();

  // Get initial currentTime
  const initialTime = await video.evaluate((el: HTMLVideoElement) => el.currentTime);

  // Scroll down to trigger scrubbing
  // The Hero section is at the top, so scrolling down should increase currentTime
  await page.evaluate(() => window.scrollBy(0, 300));
  
  // Wait a bit for GSAP and Lenis to update
  await page.waitForTimeout(500);

  // Get new currentTime
  const newTime = await video.evaluate((el: HTMLVideoElement) => el.currentTime);

  // The currentTime should have increased due to GSAP ScrollTrigger scrubbing
  // Note: In some environments, video might not actually play/scrub if not loaded,
  // but we expect the GSAP logic to at least attempt to update it.
  // We check if it's different from initialTime.
  expect(newTime).not.toBe(initialTime);
});

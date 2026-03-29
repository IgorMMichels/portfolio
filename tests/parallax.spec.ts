import { test, expect } from '@playwright/test';

test('Hero video scrubbing on scroll', async ({ page }) => {
  // Go to the app (preview server)
  await page.goto('http://localhost:4173');

  // Wait for the loading screen to disappear
  await page.waitForSelector('.app.opacity-100', { timeout: 15000 });

  // Find the Hero video
  const video = page.locator('.hero-video');
  await expect(video).toBeVisible();

  // Get initial currentTime
  const initialTime = await video.evaluate((el: HTMLVideoElement) => el.currentTime);

  // Scroll down to trigger the video scrub
  await page.evaluate(() => window.scrollBy(0, 1000));
  
  // Wait a bit for Lenis and GSAP to update
  await page.waitForTimeout(1000);

  // Get new currentTime
  const newTime = await video.evaluate((el: HTMLVideoElement) => el.currentTime);

  // The currentTime should have changed due to GSAP ScrollTrigger
  // Note: In some environments, video might not load or duration might be 0
  // but we expect it to change if the video is loaded.
  console.log(`Initial time: ${initialTime}, New time: ${newTime}`);
  expect(newTime).not.toBe(initialTime);
});

test('Trabalhos section is visible and has projects', async ({ page }) => {
  await page.goto('http://localhost:4173');
  await page.waitForSelector('.app.opacity-100', { timeout: 15000 });

  const trabalhosSection = page.locator('#trabalhos');
  await expect(trabalhosSection).toBeVisible();

  const projects = page.locator('.trabalhos .scroll-cards-wrapper img');
  await expect(projects).toHaveCount(5);
});

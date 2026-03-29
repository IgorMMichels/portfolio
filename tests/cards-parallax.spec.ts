import { test, expect } from '@playwright/test';

test.describe('CardsParallax UI Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the app
    await page.goto('http://localhost:5173');
    // Wait for the loading screen to disappear
    await page.waitForSelector('.app.opacity-100', { timeout: 15000 });
  });

  test('Trabalhos section is visible and contains 5 cards', async ({ page }) => {
    const trabalhosSection = page.locator('#trabalhos');
    await expect(trabalhosSection).toBeVisible();

    // Check for the CardsParallax container
    const cardsContainer = page.locator('.scroll-cards-wrapper');
    await expect(cardsContainer).toBeVisible();

    // Verify 5 cards are rendered
    const cards = cardsContainer.locator('.sticky');
    await expect(cards).toHaveCount(5);
  });

  test('Cards have correct sticky positioning and parallax offsets', async ({ page }) => {
    const cards = page.locator('.scroll-cards-wrapper .sticky');
    
    for (let i = 0; i < 5; i++) {
      const card = cards.nth(i);
      const style = await card.getAttribute('style');
      
      // Verify sticky top offset calculation: calc(10vh + index * 30px)
      expect(style).toContain(`top: calc(10vh + ${i * 30}px)`);
      expect(style).toContain(`z-index: ${i}`);
    }
  });

  test('Images are lazy-loaded and have alt text', async ({ page }) => {
    const images = page.locator('.scroll-cards-wrapper img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('loading', 'lazy');
      const alt = await img.getAttribute('alt');
      expect(alt).toContain('Screenshot of');
    }
  });

  test('Project links have correct accessibility attributes', async ({ page }) => {
    const links = page.locator('.scroll-cards-wrapper a');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      const ariaLabel = await link.getAttribute('aria-label');
      expect(ariaLabel).toContain('Visit');
      expect(ariaLabel).toContain('project');
    }
  });

  test('Visual parallax effect on scroll', async ({ page }) => {
    const trabalhosSection = page.locator('#trabalhos');
    await trabalhosSection.scrollIntoViewIfNeeded();
    
    const firstCard = page.locator('.scroll-cards-wrapper .sticky').first();
    const initialBox = await firstCard.boundingBox();
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500); // Wait for Lenis/GSAP
    
    const newBox = await firstCard.boundingBox();
    
    // Since it's sticky, it should stay within the viewport or move differently than non-sticky elements
    // We just verify it's still visible and hasn't disappeared
    expect(newBox).not.toBeNull();
    if (initialBox && newBox) {
      // In a sticky scenario, the element might stay at the same 'top' relative to viewport
      // while the page scrolls.
      console.log(`Initial Y: ${initialBox.y}, New Y: ${newBox.y}`);
    }
  });
});

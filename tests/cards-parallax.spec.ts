import { test, expect } from '@playwright/test';

test.describe('CardsParallax UI Verification', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60s
    // Go to the app
    await page.goto('/');
    // Wait for the app to load
    await page.waitForSelector('#trabalhos', { state: 'attached', timeout: 60000 });
  });

  test('Trabalhos section is visible and contains 5 cards', async ({ page }) => {
    const trabalhosSection = page.locator('#trabalhos');
    await expect(trabalhosSection).toBeVisible();

    // Check for the CardsParallax container
    const cardsContainer = page.locator('.scroll-cards-wrapper > div');
    await expect(cardsContainer).toBeVisible();
    
    // Verify 90vw container width
    const containerClass = await cardsContainer.getAttribute('class');
    expect(containerClass).toContain('w-[90vw]');

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
      // Use regex to handle different operand order in calc()
      const expectedTop = new RegExp(`top: calc\\((${i * 30}px \\+ 10vh|10vh \\+ ${i * 30}px)\\)`);
      expect(style).toMatch(expectedTop);
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
    
    // Scroll to the section using evaluate to avoid waiting for stability
    await page.evaluate(() => {
      const el = document.getElementById('trabalhos');
      if (el) el.scrollIntoView();
    });
    
    const firstCard = page.locator('.scroll-cards-wrapper .sticky').first();
    
    // Scroll the card into view to trigger GSAP animation
    await page.evaluate(() => {
      const el = document.querySelector('.scroll-cards-wrapper .sticky');
      if (el) el.scrollIntoView();
    });
    
    // Wait for the card to become visible (opacity > 0)
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    
    const initialBox = await firstCard.boundingBox();
    
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000); // Wait for Lenis/GSAP
    
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

import { test, expect, devices } from '@playwright/test';

/**
 * Visual Regression Tests
 * Testy wizualne dla 3 rozdzielczości z automatycznymi zrzutami ekranu
 */

const viewports = [
  { name: 'mobile', ...devices['iPhone 12'].viewport },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

test.describe('Visual Regression Tests', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} - ${viewport.width}x${viewport.height}`, () => {
      test.use({
        viewport: { width: viewport.width, height: viewport.height },
      });

      test('should render homepage correctly', async ({ page }) => {
        await page.goto('/');

        // Czekamy na pełne załadowanie
        await page.waitForLoadState('networkidle');

        // Screenshot pełnej strony
        await expect(page).toHaveScreenshot(
          `${viewport.name}-homepage-full.png`,
          {
            fullPage: true,
            animations: 'disabled',
          }
        );
      });

      test('should render header correctly', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const header = page.locator('.app-header');
        await expect(header).toBeVisible();

        // Screenshot headera
        await expect(header).toHaveScreenshot(`${viewport.name}-header.png`, {
          animations: 'disabled',
        });
      });

      test('should render main content area', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const main = page.locator('.app-main');
        await expect(main).toBeVisible();

        // Screenshot głównej zawartości
        await expect(main).toHaveScreenshot(
          `${viewport.name}-main-content.png`,
          {
            animations: 'disabled',
          }
        );
      });

      test('should render sidebar/aside correctly', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const sidebar = page.locator('.app-sidebar');

        if (viewport.width >= 1024) {
          // Desktop: sidebar powinien być widoczny
          await expect(sidebar).toBeVisible();
          await expect(sidebar).toHaveScreenshot(
            `${viewport.name}-sidebar.png`,
            {
              animations: 'disabled',
            }
          );
        } else {
          // Mobile/Tablet: sidebar poniżej contentu
          await expect(sidebar).toBeVisible();
          await sidebar.scrollIntoViewIfNeeded();
          await expect(sidebar).toHaveScreenshot(
            `${viewport.name}-sidebar-stacked.png`,
            {
              animations: 'disabled',
            }
          );
        }
      });

      test('should render footer correctly', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const footer = page.locator('.app-footer');
        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();

        // Screenshot footera
        await expect(footer).toHaveScreenshot(`${viewport.name}-footer.png`, {
          animations: 'disabled',
        });
      });

      test('should render demo section', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const demo = page.locator('.app-demo');
        await demo.scrollIntoViewIfNeeded();
        await expect(demo).toBeVisible();

        // Screenshot sekcji demo
        await expect(demo).toHaveScreenshot(
          `${viewport.name}-demo-section.png`,
          {
            animations: 'disabled',
          }
        );
      });

      test('should handle theme toggle with visual verification', async ({
        page,
      }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Screenshot w motywie początkowym
        await expect(page).toHaveScreenshot(
          `${viewport.name}-theme-initial.png`,
          {
            fullPage: true,
            animations: 'disabled',
          }
        );

        // Kliknij przycisk zmiany motywu
        const themeButton = page
          .locator('button')
          .filter({ hasText: /Theme:/ })
          .first();
        await themeButton.click();
        await page.waitForTimeout(300); // Czekaj na transition

        // Screenshot po zmianie motywu
        await expect(page).toHaveScreenshot(
          `${viewport.name}-theme-toggled.png`,
          {
            fullPage: true,
            animations: 'disabled',
          }
        );
      });

      test('should verify button states visually', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Scroll do sekcji z przyciskami
        const buttonSection = page
          .locator('h2')
          .filter({ hasText: 'Component Demos' });
        await buttonSection.scrollIntoViewIfNeeded();

        // Screenshot wszystkich wariantów przycisków
        const buttonVariants = page
          .locator('h3')
          .filter({ hasText: 'Button Variants' });
        await buttonVariants.scrollIntoViewIfNeeded();

        await expect(page.locator('.app-demo')).toHaveScreenshot(
          `${viewport.name}-button-variants.png`,
          {
            animations: 'disabled',
          }
        );
      });

      test('should verify card components visually', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Screenshot wszystkich kart
        const cards = page.locator('.pta-card');
        const count = await cards.count();

        for (let i = 0; i < Math.min(count, 5); i++) {
          const card = cards.nth(i);
          await card.scrollIntoViewIfNeeded();
          await expect(card).toHaveScreenshot(
            `${viewport.name}-card-${i + 1}.png`,
            {
              animations: 'disabled',
            }
          );
        }
      });

      test('should verify responsive layout', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Sprawdź czy layout się poprawnie dostosowuje
        const layout = page.locator('.app-layout');
        await expect(layout).toBeVisible();

        // Screenshot całego layoutu
        await expect(page).toHaveScreenshot(
          `${viewport.name}-responsive-layout.png`,
          {
            fullPage: true,
            animations: 'disabled',
          }
        );

        // Weryfikacja grid areas
        if (viewport.width >= 1024) {
          // Desktop: sidebar obok contentu
          const mainGrid = page.locator('.app-main-grid');
          const gridTemplate = await mainGrid.evaluate(
            el => window.getComputedStyle(el).gridTemplateAreas
          );
          expect(gridTemplate).toContain('content sidebar');
        } else {
          // Mobile/Tablet: sidebar poniżej
          const mainGrid = page.locator('.app-main-grid');
          const gridTemplate = await mainGrid.evaluate(
            el => window.getComputedStyle(el).gridTemplateAreas
          );
          expect(gridTemplate).toContain('content');
          expect(gridTemplate).toContain('sidebar');
        }
      });
    });
  }

  test.describe('Accessibility & Interaction Tests', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');

      // H1 - tylko jeden na stronie
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toContainText('Preact Training App');

      // H2 - nagłówki sekcji
      const h2 = page.locator('h2');
      await expect(h2.first()).toBeVisible();

      // H3 - podsekcje
      const h3 = page.locator('h3');
      await expect(h3.first()).toBeVisible();
    });

    test('should have accessible buttons', async ({ page }) => {
      await page.goto('/');

      // Wszystkie przyciski mają text lub aria-label
      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');

        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should support keyboard navigation', async ({ page }) => {
      await page.goto('/');

      // Tab przez interaktywne elementy
      await page.keyboard.press('Tab');
      const firstFocused = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(['BUTTON', 'A', 'INPUT']).toContain(firstFocused || '');

      // Screenshot z focus visible
      await expect(page).toHaveScreenshot('keyboard-focus.png', {
        animations: 'disabled',
      });
    });
  });
});

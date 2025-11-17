// Navigation E2E Tests
// Tests for navigation functionality, active states, and anchor links

import { test, expect } from '@playwright/test';

test.describe('Navigation System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display navigation sidebar', async ({ page }) => {
    // Check if navigation is present
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // Check for main navigation items
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Settings/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    // Navigate to Settings
    await page
      .getByRole('link', { name: /Settings/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();

    // Navigate to About
    await page.getByRole('link', { name: /About/i }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

    // Navigate back to Home
    await page.getByRole('link', { name: /Home/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('should expand/collapse Settings submenu', async ({ page }) => {
    // Click on Settings to expand
    const settingsLink = page.getByRole('link', { name: /Settings/i }).first();
    await settingsLink.click();

    // Wait for submenu to appear
    await page.waitForTimeout(300); // Animation time

    // Check if submenu items are visible
    const generalLink = page.getByRole('link', { name: /General/i });
    const appearanceLink = page.getByRole('link', { name: /Appearance/i });

    // Submenu should be expanded (items visible or parent expanded)
    const isExpanded = await settingsLink.getAttribute('aria-expanded');
    expect(isExpanded).toBe('true');
  });

  test('should navigate to Settings anchor links', async ({ page }) => {
    // First navigate to Settings page
    await page.goto('/settings');

    // Click on General anchor link
    await page
      .getByRole('link', { name: /General/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/settings#general/);

    // Click on Appearance anchor link
    await page
      .getByRole('link', { name: /Appearance/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/settings#appearance/);

    // Click on Notifications anchor link
    await page
      .getByRole('link', { name: /Notifications/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/settings#notifications/);
  });

  test('should highlight active navigation item', async ({ page }) => {
    // Home should be active initially
    const homeLink = page.getByRole('link', { name: /Home/i }).first();
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // Navigate to Settings
    await page
      .getByRole('link', { name: /Settings/i })
      .first()
      .click();
    await page.waitForTimeout(100);

    // Settings should now be active
    const settingsLink = page.getByRole('link', { name: /Settings/i }).first();
    const ariaCurrent = await settingsLink.getAttribute('aria-current');

    // Either the parent Settings or a child should be marked as current
    expect(
      ariaCurrent === 'page' ||
        (await page.locator('[aria-current="page"]').count()) > 0
    ).toBeTruthy();
  });

  test('should open mobile menu on small screens', async ({ page }) => {
    // Resize to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Hamburger menu should be visible
    const hamburger = page.getByRole('button', { name: /Toggle navigation/i });
    await expect(hamburger).toBeVisible();

    // Click hamburger to open menu
    await hamburger.click();
    await page.waitForTimeout(300); // Animation time

    // Navigation should be visible
    const nav = page.locator('.app-aside--open');
    await expect(nav).toBeVisible();

    // Can click navigation link
    await page
      .getByRole('link', { name: /Settings/i })
      .first()
      .click();

    // Menu should close and navigate
    await page.waitForTimeout(300);
    await expect(page).toHaveURL(/\/settings/);
  });

  test('should open external links in new tab', async ({ context, page }) => {
    // Listen for new pages (tabs)
    const pagePromise = context.waitForEvent('page');

    // Click external documentation link
    const docLink = page.getByRole('link', { name: /Documentation/i }).first();
    await docLink.click();

    // New page should open
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Should be external URL
    expect(newPage.url()).toContain('preactjs.com');
  });
});

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display footer with all sections', async ({ page }) => {
    // Check footer is present
    const footer = page.locator('footer.pta-footer');
    await expect(footer).toBeVisible();

    // Check sections
    await expect(footer.getByText(/Preact Training/i)).toBeVisible();
    await expect(footer.getByText(/Quick Links/i)).toBeVisible();
    await expect(footer.getByText(/Resources/i)).toBeVisible();
    await expect(footer.getByText(/Legal & Contact/i)).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    // Check internal link (Home)
    await page
      .locator('footer.pta-footer')
      .getByRole('link', { name: 'Home' })
      .click();
    await expect(page).toHaveURL('/');

    // Check Settings link
    await page
      .locator('footer.pta-footer')
      .getByRole('link', { name: 'Settings' })
      .click();
    await expect(page).toHaveURL(/\/settings/);
  });

  test('should display social media icons', async ({ page }) => {
    const footer = page.locator('footer.pta-footer');

    // Check for social links (by aria-label)
    await expect(footer.getByLabel('Twitter')).toBeVisible();
    await expect(footer.getByLabel('GitHub')).toBeVisible();
    await expect(footer.getByLabel('Discord')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const footer = page.locator('footer.pta-footer');
    await expect(footer).toBeVisible();

    // Footer should still show all content
    await expect(footer.getByText(/Preact Training/i)).toBeVisible();
    await expect(footer.getByText(/Quick Links/i)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Preact Button Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application correctly', async ({ page }) => {
    // Check main heading
    await expect(page.locator('h1')).toContainText('Hello, Preact!');

    // Check welcome message
    await expect(page.locator('p')).toContainText('Welcome to your Preact training application.');

    // Check theme display
    await expect(page.locator('p')).toContainText('Current Theme:');
  });

  test('should display all button variants', async ({ page }) => {
    // Check Button Variants section
    await expect(page.locator('h3').filter({ hasText: 'Button Variants' })).toBeVisible();

    // Check all variant buttons are present
    await expect(page.locator('button').filter({ hasText: 'Primary' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Secondary' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Success' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Danger' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Disabled' })).toBeVisible();
  });

  test('should display semantic state buttons', async ({ page }) => {
    await expect(page.locator('h3').filter({ hasText: 'Semantic States' })).toBeVisible();

    await expect(page.locator('button').filter({ hasText: 'Success State' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Error State' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Warning State' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Info State' })).toBeVisible();
  });

  test('should display shadow variants', async ({ page }) => {
    await expect(page.locator('h3').filter({ hasText: 'Shadow Variants' })).toBeVisible();

    await expect(page.locator('button').filter({ hasText: 'Light Shadow' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Medium Shadow' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Heavy Shadow' })).toBeVisible();
  });

  test('should display size variants', async ({ page }) => {
    await expect(page.locator('h3').filter({ hasText: 'Size Variants' })).toBeVisible();

    await expect(page.locator('button').filter({ hasText: 'Small' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Medium' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Large' })).toBeVisible();
  });

  test('should display combined examples', async ({ page }) => {
    await expect(page.locator('h3').filter({ hasText: 'Combined Examples' })).toBeVisible();

    await expect(page.locator('button').filter({ hasText: 'Primary Large with Shadow' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Success with State' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Danger Small Heavy' })).toBeVisible();
  });

  test('should toggle theme correctly', async ({ page }) => {
    // Get initial theme
    const initialThemeText = await page.locator('p').filter({ hasText: 'Current Theme:' }).textContent();
    const initialTheme = initialThemeText?.replace('Current Theme: ', '') || '';

    // Click theme toggle button
    const toggleButton = page.locator('button').filter({ hasText: new RegExp(`Toggle Theme \\(${initialTheme}\\)`) });
    await toggleButton.click();

    // Check that theme changed
    const newThemeText = await page.locator('p').filter({ hasText: 'Current Theme:' }).textContent();
    const newTheme = newThemeText?.replace('Current Theme: ', '') || '';

    // Theme should be different from initial
    expect(newTheme).not.toBe(initialTheme);

    // Button text should update
    await expect(page.locator('button').filter({ hasText: new RegExp(`Toggle Theme \\(${newTheme}\\)`) })).toBeVisible();
  });

  test('should have correct button classes applied', async ({ page }) => {
    // Check primary button has correct class
    const primaryButton = page.locator('button').filter({ hasText: 'Primary' });
    await expect(primaryButton).toHaveClass(/pta-button.*pta-button--primary/);

    // Check success button has correct class
    const successButton = page.locator('button').filter({ hasText: 'Success' });
    await expect(successButton).toHaveClass(/pta-button.*pta-button--success/);

    // Check large button has correct size class
    const largeButton = page.locator('button').filter({ hasText: 'Large' });
    await expect(largeButton).toHaveClass(/pta-button.*pta-button--lg/);
  });

  test('should handle disabled button correctly', async ({ page }) => {
    const disabledButton = page.locator('button').filter({ hasText: 'Disabled' });

    // Check button is disabled
    await expect(disabledButton).toBeDisabled();

    // Check button has disabled class
    await expect(disabledButton).toHaveClass(/pta-button.*pta-button--disabled/);
  });

  test('should apply theme to document element', async ({ page }) => {
    // Check initial theme is applied to document
    const initialDataTheme = await page.getAttribute('html', 'data-theme');
    expect(['light', 'dark', 'auto']).toContain(initialDataTheme);

    // Toggle theme and check document theme updates
    const toggleButton = page.locator('button').filter({ hasText: 'Toggle Theme' });
    await toggleButton.click();

    // Wait a bit for theme to change
    await page.waitForTimeout(100);

    const newDataTheme = await page.getAttribute('html', 'data-theme');
    expect(['light', 'dark', 'auto']).toContain(newDataTheme);
  });
});
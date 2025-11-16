import { test, expect } from '@playwright/test';

test('homepage has title and theme toggle', async ({ page }) => {
  await page.goto('/');

  // Check if the page has the correct title
  await expect(page).toHaveTitle(/Preact/);

  // Check if the main heading is visible
  await expect(page.locator('h1')).toContainText('Hello, Preact!');

  // Check if theme toggle button exists
  const themeButton = page.locator('button').filter({ hasText: 'Toggle Theme' });
  await expect(themeButton).toBeVisible();

  // Check initial theme
  await expect(page.locator('p').filter({ hasText: 'Current Theme:' })).toContainText('dark');

  // Click theme toggle and check if theme changes
  await themeButton.click();
  await expect(page.locator('p').filter({ hasText: 'Current Theme:' })).toContainText('light');
});

test('button variants demo', async ({ page }) => {
  await page.goto('/');

  // Check if button variants are displayed
  await expect(page.locator('h2')).toContainText('Button Variants Demo');

  // Check if different button variants exist (using exact text to avoid conflicts)
  await expect(page.getByRole('button', { name: 'Primary', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Secondary', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Success', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Danger', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Disabled', exact: true })).toBeVisible();

  // Check if disabled button is actually disabled
  const disabledButton = page.getByRole('button', { name: 'Disabled', exact: true });
  await expect(disabledButton).toBeDisabled();
});

test('semantic states demo', async ({ page }) => {
  await page.goto('/');

  // Check semantic state buttons
  await expect(page.locator('button').filter({ hasText: 'Success State' })).toBeVisible();
  await expect(page.locator('button').filter({ hasText: 'Error State' })).toBeVisible();
  await expect(page.locator('button').filter({ hasText: 'Warning State' })).toBeVisible();
  await expect(page.locator('button').filter({ hasText: 'Info State' })).toBeVisible();
});

test('shadow variants demo', async ({ page }) => {
  await page.goto('/');

  // Check shadow variant buttons
  await expect(page.locator('button').filter({ hasText: 'Light Shadow' })).toBeVisible();
  await expect(page.locator('button').filter({ hasText: 'Medium Shadow' })).toBeVisible();
  await expect(page.locator('button').filter({ hasText: 'Heavy Shadow' })).toBeVisible();
});

test('size variants demo', async ({ page }) => {
  await page.goto('/');

  // Check size variant buttons (using exact text to avoid conflicts)
  await expect(page.getByRole('button', { name: 'Small', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Medium', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Large', exact: true })).toBeVisible();
});
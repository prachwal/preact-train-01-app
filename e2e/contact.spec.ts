import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should render contact form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Contact Us');
    await expect(page.getByLabel('Your Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Subject')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Send Message' })
    ).toBeVisible();
  });

  test('should display validation errors on empty submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Subject is required')).toBeVisible();
    await expect(page.getByText('Message is required')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.getByLabel('Email Address').fill('invalid-email');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(
      page.getByText('Please enter a valid email address')
    ).toBeVisible();
  });

  test('should show character count for message', async ({ page }) => {
    const message = 'Test message';
    await page.getByLabel('Message').fill(message);

    await expect(page.getByText(`${message.length}/1000`)).toBeVisible();
  });

  test('should submit form with valid data', async ({ page }) => {
    await page.getByLabel('Your Name').fill('John Doe');
    await page.getByLabel('Email Address').fill('john@example.com');
    await page.getByLabel('Subject').fill('Test Subject');
    await page
      .getByLabel('Message')
      .fill('This is a test message with enough characters.');

    await page.getByRole('button', { name: 'Send Message' }).click();

    // Wait for success message
    await expect(page.getByText('Message Sent Successfully!')).toBeVisible({
      timeout: 3000,
    });
  });

  test('should clear errors when typing', async ({ page }) => {
    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.getByText('Name is required')).toBeVisible();

    await page.getByLabel('Your Name').fill('J');
    await expect(page.getByText('Name is required')).not.toBeVisible();
  });

  test('should be accessible via footer link', async ({ page }) => {
    await page.goto('/');

    // Find and click Contact Us link in footer
    await page.getByRole('link', { name: 'Contact Us' }).click();

    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Contact Us');
  });

  test('should not appear in sidebar navigation', async ({ page }) => {
    await page.goto('/');

    // Check that Contact is not in the sidebar
    const sidebar = page.locator('.pta-navigation');
    await expect(
      sidebar.getByText('Contact', { exact: true })
    ).not.toBeVisible();
  });

  test('should display info cards', async ({ page }) => {
    await expect(page.getByText('Get in Touch')).toBeVisible();
    await expect(page.getByText('Response Time')).toBeVisible();
    await expect(page.getByText('Privacy')).toBeVisible();
  });

  test('should have working privacy policy link', async ({ page }) => {
    const privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});

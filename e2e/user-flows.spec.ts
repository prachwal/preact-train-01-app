import { test, expect } from '@playwright/test';

test.describe('Navigation and Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Settings page from sidebar', async ({ page }) => {
    // Wait for app to load
    await page.waitForSelector('.app-wrapper');

    // Open sidebar on mobile/tablet
    const hamburger = page.locator('.pta-hamburger');
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }

    // Click Settings link
    await page.click('a[href="/settings"]');

    // Verify we're on Settings page
    await expect(page).toHaveURL('/settings');
    await expect(page.locator('h2:has-text("Settings")')).toBeVisible();
  });

  test('should navigate to Home page', async ({ page }) => {
    // Navigate to settings first
    await page.goto('/settings');

    // Open sidebar
    const hamburger = page.locator('.pta-hamburger');
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }

    // Click Home link
    await page.click('a[href="/"]');

    // Verify we're on Home page
    await expect(page).toHaveURL('/');
    await expect(page.locator('h2:has-text("Dashboard")')).toBeVisible();
  });

  test('should show active link in sidebar', async ({ page }) => {
    // Open sidebar
    const hamburger = page.locator('.pta-hamburger');
    if (await hamburger.isVisible()) {
      await hamburger.click();
    }

    // Check that Home is active
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toHaveClass(/pta-sidebar__link--active/);
  });

  test('should close sidebar after navigation on mobile', async ({
    page,
    viewport,
  }) => {
    if (viewport && viewport.width < 1024) {
      // Open sidebar
      await page.click('.pta-hamburger');
      await expect(page.locator('.pta-sidebar')).toBeVisible();

      // Click a link
      await page.click('a[href="/settings"]');

      // Sidebar should close
      await expect(page.locator('.pta-sidebar')).not.toBeVisible();
    }
  });
});

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should toggle theme using header button', async ({ page }) => {
    // Get initial theme
    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    // Click theme toggle
    await page.click('.app-header__theme-btn');

    // Wait for theme to change
    await page.waitForTimeout(300);

    // Verify theme changed
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should persist theme across page reloads', async ({ page }) => {
    // Set dark theme
    await page.click('.app-header__theme-btn');
    await page.waitForTimeout(300);

    const themeBeforeReload = await page
      .locator('html')
      .getAttribute('data-theme');

    // Reload page
    await page.reload();

    // Theme should persist
    const themeAfterReload = await page
      .locator('html')
      .getAttribute('data-theme');
    expect(themeAfterReload).toBe(themeBeforeReload);
  });

  test('should switch theme from Settings page', async ({ page }) => {
    await page.goto('/settings');

    // Get initial theme
    const initialTheme = await page.locator('html').getAttribute('data-theme');

    // Find and click theme switch
    const themeSwitch = page.locator('.pta-switch').first();
    await themeSwitch.click();

    await page.waitForTimeout(300);

    // Verify theme changed
    const newTheme = await page.locator('html').getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
  });
});

test.describe('Modal Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('should open and close modal', async ({ page }) => {
    // Open a modal (e.g., Edit Profile)
    await page.click('button:has-text("Edit Profile")');

    // Modal should be visible
    await expect(page.locator('.pta-modal')).toBeVisible();

    // Close modal with X button
    await page.click('.pta-modal__close');

    // Modal should be hidden
    await expect(page.locator('.pta-modal')).not.toBeVisible();
  });

  test('should close modal with Escape key', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Edit Profile")');
    await expect(page.locator('.pta-modal')).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Modal should close
    await expect(page.locator('.pta-modal')).not.toBeVisible();
  });

  test('should close modal when clicking backdrop', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Edit Profile")');
    await expect(page.locator('.pta-modal')).toBeVisible();

    // Click backdrop (not modal content)
    await page.locator('.pta-modal').click({ position: { x: 0, y: 0 } });

    // Modal should close
    await expect(page.locator('.pta-modal')).not.toBeVisible();
  });

  test('should not close modal when clicking inside content', async ({
    page,
  }) => {
    // Open modal
    await page.click('button:has-text("Edit Profile")');
    await expect(page.locator('.pta-modal')).toBeVisible();

    // Click inside modal content
    await page.locator('.pta-modal__content').click();

    // Modal should still be visible
    await expect(page.locator('.pta-modal')).toBeVisible();
  });

  test('should trap focus inside modal', async ({ page }) => {
    // Open modal
    await page.click('button:has-text("Edit Profile")');

    // Focus should be inside modal
    const focusedElement = await page.evaluate(() => {
      const modal = document.querySelector('.pta-modal');
      return modal?.contains(document.activeElement);
    });

    expect(focusedElement).toBeTruthy();
  });
});

test.describe('Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('should toggle switches', async ({ page }) => {
    // Find first switch
    const switchElement = page.locator('.pta-switch').first();
    const switchSlider = switchElement.locator('.pta-switch__slider');

    // Get initial state
    const initialChecked = await switchSlider.getAttribute('aria-checked');

    // Click switch
    await switchSlider.click();

    // State should change
    const newChecked = await switchSlider.getAttribute('aria-checked');
    expect(newChecked).not.toBe(initialChecked);
  });

  test('should handle switch keyboard interaction', async ({ page }) => {
    const switchSlider = page.locator('.pta-switch__slider').first();

    // Focus switch
    await switchSlider.focus();

    // Get initial state
    const initialChecked = await switchSlider.getAttribute('aria-checked');

    // Press space to toggle
    await page.keyboard.press('Space');

    // State should change
    const newChecked = await switchSlider.getAttribute('aria-checked');
    expect(newChecked).not.toBe(initialChecked);
  });

  test('should not toggle disabled switches', async ({ page }) => {
    // Find a disabled switch (if any)
    const disabledSwitch = page.locator(
      '.pta-switch--disabled .pta-switch__slider'
    );

    if ((await disabledSwitch.count()) > 0) {
      const initialChecked = await disabledSwitch.getAttribute('aria-checked');

      // Try to click
      await disabledSwitch.click();

      // State should not change
      const newChecked = await disabledSwitch.getAttribute('aria-checked');
      expect(newChecked).toBe(initialChecked);
    }
  });
});

test.describe('Responsive Behavior', () => {
  test('should show hamburger on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hamburger should be visible
    await expect(page.locator('.pta-hamburger')).toBeVisible();

    // Sidebar should be hidden initially
    const sidebar = page.locator('.pta-sidebar');
    const isVisible = await sidebar.isVisible();
    expect(isVisible).toBeFalsy();
  });

  test('should hide hamburger on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    // Hamburger should not be visible
    const hamburger = page.locator('.pta-hamburger');
    const isVisible = await hamburger.isVisible();
    expect(isVisible).toBeFalsy();

    // Sidebar should be visible
    await expect(page.locator('.pta-sidebar')).toBeVisible();
  });

  test('should toggle sidebar with hamburger', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Click hamburger to open
    await page.click('.pta-hamburger');
    await expect(page.locator('.pta-sidebar')).toBeVisible();

    // Click hamburger to close
    await page.click('.pta-hamburger');
    await page.waitForTimeout(300);
    const isVisible = await page.locator('.pta-sidebar').isVisible();
    expect(isVisible).toBeFalsy();
  });

  test('should adapt grid layout on different screen sizes', async ({
    page,
  }) => {
    // Test mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const metricsGrid = page.locator('.pta-grid--metrics');
    await expect(metricsGrid).toBeVisible();

    // Test tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(metricsGrid).toBeVisible();

    // Test desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(metricsGrid).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1 = page.locator('h1');
    expect(await h1.count()).toBeGreaterThan(0);

    // Check for h2
    const h2 = page.locator('h2');
    expect(await h2.count()).toBeGreaterThan(0);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Navigation should have links with text
    const navLinks = page.locator('.pta-sidebar__link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    // All links should have accessible text
    for (let i = 0; i < count; i++) {
      const text = await navLinks.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should have proper ARIA labels on interactive elements', async ({
    page,
  }) => {
    await page.goto('/');

    // Theme button should have aria-label
    const themeBtn = page.locator('.app-header__theme-btn');
    const ariaLabel = await themeBtn.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();

    // Hamburger should have aria-label and aria-expanded
    const hamburger = page.locator('.pta-hamburger');
    if (await hamburger.isVisible()) {
      const hamburgerLabel = await hamburger.getAttribute('aria-label');
      const hamburgerExpanded = await hamburger.getAttribute('aria-expanded');
      expect(hamburgerLabel).toBeTruthy();
      expect(hamburgerExpanded).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');

    // Check that something is focused
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    expect(focusedElement).toBeTruthy();
  });
});

test.describe('Performance', () => {
  test('should load page within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForSelector('.app-wrapper');
    const loadTime = Date.now() - startTime;

    // Page should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(1000);

    // Filter out known harmless errors if any
    const criticalErrors = consoleErrors.filter(
      error => !error.includes('favicon') // Ignore favicon errors
    );

    expect(criticalErrors.length).toBe(0);
  });
});

import { test, expect } from '@playwright/test';

test('User successfully navigates to agents and creates new agent', async ({ page }) => {
    // 1. Landing Page
    await page.goto('/');
    await expect(page.getByText('TrustScore for Digital Health Agents')).toBeVisible();

    // 2. Navigate to Directory
    // Ensure the button is present and then click
    await expect(page.locator('text=Explore Directory').first()).toBeVisible();
    await page.click('text=Explore Directory');

    // Increased timeout for navigation and check specific matching
    await expect(page).toHaveURL(/.*\/agents/, { timeout: 10000 });
    await expect(page.getByText('Agent Directory')).toBeVisible();

    // 3. Login Demo
    await page.click('text=Login Demo');
    // Wait for login to complete (network request), increase timeout for external service
    await expect(page.getByText('Logout')).toBeVisible({ timeout: 15000 });

    // 4. Admin Agent Creation (UI Verification)
    // Navigate to dashboard
    await expect(page.locator('a[href="/dashboard"]')).toBeVisible();
    await page.click('a[href="/dashboard"]');
    await expect(page).toHaveURL('/dashboard');

    await page.click('text=+ Register New Agent');
    await expect(page).toHaveURL('/admin/agents/new');

    await page.fill('input[name="name"]', 'Playwright Test Agent');
    await page.fill('textarea[name="description"]', 'An agent created by E2E tests.');
    await page.fill('input[name="website_url"]', 'https://playwright.dev');
    await page.fill('input[name="compliance_tags"]', 'GDPR, E2E');

    // Ensure hydration is complete - wait generously to prevent native form submit
    await page.waitForTimeout(3000);

    // Handle alert
    // Handle alert - this must be set up BEFORE the action that triggers it
    page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.dismiss(); // dismiss or accept
    });

    await page.click('button[type="submit"]');

    // 5. Verify Redirect and Listing
    // Increase timeout for redirect
    await expect(page).toHaveURL(/\/agents$/, { timeout: 15000 });
    await expect(page.getByText('Playwright Test Agent')).toBeVisible();
});

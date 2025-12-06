import { test, expect } from '@playwright/test';

test('User successfully navigates to agents and creates new agent', async ({ page }) => {
    // 1. Landing Page
    await page.goto('/');
    await expect(page.getByText('TrustScore for Digital Health Agents')).toBeVisible();

    // 2. Navigate to Directory
    await page.click('text=Explore Directory');
    await expect(page).toHaveURL('/agents');
    await expect(page.getByText('Agent Directory')).toBeVisible();

    // 3. Login Demo
    await page.click('text=Login Demo');
    // Wait for login to complete (network request)
    await expect(page.getByText('Logout')).toBeVisible({ timeout: 10000 });

    // 4. Admin Agent Creation (UI Verification)
    // Navigate to dashboard
    await page.click('text=Dashboard');
    await expect(page).toHaveURL('/dashboard');

    await page.click('text=+ Register New Agent');
    await expect(page).toHaveURL('/admin/agents/new');

    await page.fill('input[name="name"]', 'Playwright Test Agent');
    await page.fill('textarea[name="description"]', 'An agent created by E2E tests.');
    await page.fill('input[name="website_url"]', 'https://playwright.dev');
    await page.fill('input[name="compliance_tags"]', 'GDPR, E2E');

    // Ensure hydration is complete
    await page.waitForTimeout(500);

    // Handle alert
    page.on('dialog', dialog => dialog.accept());

    await page.click('button[type="submit"]');

    // 5. Verify Redirect and Listing
    await expect(page).toHaveURL('/agents');
    await expect(page.getByText('Playwright Test Agent')).toBeVisible();
});

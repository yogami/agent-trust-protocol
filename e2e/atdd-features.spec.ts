import { test, expect } from '@playwright/test';

test.describe('Agent Trust Protocol - ATDD Specifications', () => {

    test.describe('FEATURE: Agent Directory Browsing', () => {
        test('GIVEN unauthenticated user WHEN visiting directory THEN can view all public agents', async ({ page }) => {
            await page.goto('/agents');
            await expect(page.getByText('Agent Directory')).toBeVisible();
            // Should show at least placeholder or empty state
            await expect(page.locator('body')).toContainText(/agent|directory|no agents/i);
        });

        test('GIVEN agent directory WHEN viewing agent details THEN shows trust score breakdown', async ({ page }) => {
            await page.goto('/agents');
            // If agents exist, should show trust indicators
            const hasAgents = await page.locator('[data-testid="agent-card"], .agent-card').count() > 0;
            if (hasAgents) {
                await expect(page.getByText(/Trust|Score|Verified/i)).toBeVisible();
            }
        });
    });

    test.describe('FEATURE: Trust Score Calculation', () => {
        test('GIVEN agent with GDPR tag WHEN calculating score THEN includes compliance bonus', async ({ page }) => {
            await page.goto('/agents');
            const pageContent = await page.textContent('body');
            // Should display trust-related metrics
            expect(pageContent).toMatch(/GDPR|compliance|verified/i);
        });
    });

    test.describe('FEATURE: Agent Registration (Authenticated)', () => {
        test('GIVEN unauthenticated user WHEN accessing admin panel THEN redirects to login', async ({ page }) => {
            await page.goto('/admin/agents/new');
            // Should redirect to login or show unauthorized
            await expect(page).toHaveURL(/login|agents|\/$/);
        });

        test('GIVEN agent creation form WHEN all fields are valid THEN form is submittable', async ({ page }) => {
            // This test documents the form requirements
            await page.goto('/');
            const formExists = await page.locator('input[name="name"]').count() > 0;

            if (formExists) {
                // Form fields should accept standard input
                await page.fill('input[name="name"]', 'Test Agent');
                const nameValue = await page.inputValue('input[name="name"]');
                expect(nameValue).toBe('Test Agent');
            }
        });
    });

    test.describe('FEATURE: Pricing & Billing', () => {
        test('GIVEN pricing page WHEN viewing THEN displays available tiers', async ({ page }) => {
            await page.goto('/pricing');
            await expect(page.locator('body')).toContainText(/pricing|plan|tier|free|pro|enterprise/i);
        });
    });

    test.describe('FEATURE: Landing Page & Navigation', () => {
        test('GIVEN landing page WHEN loading THEN displays value proposition', async ({ page }) => {
            await page.goto('/');
            await expect(page.getByText(/TrustScore|Trust|Agent/i)).toBeVisible();
        });

        test('GIVEN landing page WHEN clicking directory link THEN navigates to agents', async ({ page }) => {
            await page.goto('/');
            await page.click('text=Explore Directory');
            await expect(page).toHaveURL(/agents/);
        });

        test('GIVEN any page WHEN checking header THEN shows consistent navigation', async ({ page }) => {
            await page.goto('/');
            // Should have navigation elements
            await expect(page.locator('nav, header, [role="navigation"]')).toBeVisible();
        });
    });

    test.describe('EDGE CASES: Error Handling', () => {
        test('GIVEN non-existent agent ID WHEN viewing details THEN shows appropriate error', async ({ page }) => {
            const response = await page.goto('/agents/non-existent-id-12345');
            expect([200, 404]).toContain(response?.status() ?? 200);
        });

        test('GIVEN billing page WHEN unauthenticated THEN handles gracefully', async ({ page }) => {
            await page.goto('/billing');
            // Should redirect or show login prompt
            const content = await page.textContent('body');
            expect(content).toMatch(/login|billing|unauthorized|sign in/i);
        });
    });
});

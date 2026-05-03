import { test, expect } from '@playwright/test';

test.describe('VaultBot Heist Simulator (Day 2 Pivot)', () => {
  test('verifies the UI exclusively targets the live Phala TEE Enclave, not Railway', async ({ page }) => {
    // Navigate to the simulator page
    await page.goto('/simulator');

    // Select the Malicious Attack scenario
    const attackBtn = page.locator('button', { hasText: 'Treasury Drain Attack' });
    await attackBtn.click();

    // Set up a promise to wait for the specific backend request
    const requestPromise = page.waitForRequest(request => {
      // It MUST hit this exact Phala Enclave URL, otherwise the test fails
      const isTargetUrl = request.url() === 'https://c27b0861a2bf2891f43f3556d3aa9526d704f7bc-8000.dstack-pha-prod5.phala.network/enforce';
      const isPost = request.method() === 'POST';
      return isTargetUrl && isPost;
    }, { timeout: 10000 });

    // Click the execute button
    const executeBtn = page.locator('button', { hasText: 'Execute Transaction' });
    await executeBtn.click();

    // Wait for the request to be intercepted and verify it happened
    const request = await requestPromise;
    expect(request.url()).toContain('phala.network');

    // Verify the payload payload matches the malicious scenario
    const postData = JSON.parse(request.postData() || '{}');
    expect(postData.agent.id).toBe('drainbot_9000');
    expect(postData.action.toolId).toBe('assign_authority');
    expect(postData.action.parameters.amount).toBe(1500000);
    expect(postData.action.parameters.destination).toBe('sanctioned_wallet');

    // Wait for the UI to reflect the blocked state
    // We expect the word "BLOCKED" or "PANIC" to appear in the UI logs or banner
    await expect(page.locator('text=HARDWARE PANIC')).toBeVisible({ timeout: 10000 });
  });
});

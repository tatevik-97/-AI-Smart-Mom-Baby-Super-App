import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[placeholder="email"]', 'mom@example.com');
    await page.fill('input[placeholder="password"]', '123456');

    await page.click('button');

    await expect(page).toHaveURL(/dashboard/);
});
test('create log flow', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[placeholder="email"]', 'mom@example.com');
    await page.fill('input[placeholder="password"]', '123456');
    await page.click('button');

    await page.click('text=View Logs');

    await page.fill('input[placeholder="e.g. 2 hours"], input[placeholder="e.g. 150ml"], input[placeholder="e.g. wet"]', '00.5 hours');
    await page.click('button:text("Add")');

    await expect(page.locator('text=00.5 hours')).toBeVisible();
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { SignedInDashboardPage } from '../../pages/auth/SignedInDashboardPage';

test.describe('Authentication Tests', () => {
  test('Valid Sign In', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new SignedInDashboardPage(page);

    // Perform sign in
    await loginPage.signIn('arroyoc91+1@gmail.com', 'Dilbert1@');

    // Dynamically wait for the dashboard to load
    const isVisible = await dashboardPage.isDashboardVisible();
    console.log('Dashboard visible:', isVisible);
    expect(isVisible).toBeTruthy();
  });
});
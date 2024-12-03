import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { SignedInDashboardPage } from '../../pages/auth/SignedInDashboardPage';

test.describe('Authentication Tests', () => {
  test('Valid Sign In', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new SignedInDashboardPage(page);
  
    // Navigate to the login page
    await loginPage.navigateTo('/playground/auth/login');
  
    // Enter credentials and sign in
    await loginPage.enterEmail('arroyoc91+1@gmail.com');
    await loginPage.enterPassword('Dilbert1@');
    await loginPage.clickSignIn();
  
    // Dynamically wait for the dashboard to load
    await page.locator('#dashboard-container').waitFor({ state: 'visible', timeout: 10000 });
  
    // Verify the dashboard is visible
    const isVisible = await dashboardPage.isDashboardVisible();
    console.log('Dashboard visible:', isVisible);
    expect(isVisible).toBeTruthy();
  });
});
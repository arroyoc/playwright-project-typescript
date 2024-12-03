import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { SignedInDashboardPage } from '../../pages/auth/SignedInDashboardPage';

test.describe('Authentication Tests', () => {
  test('Valid Sign In', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new SignedInDashboardPage(page);

    // Perform sign in
    await loginPage.signIn('baseemail+1@gmail.com', 'ValidPassword1!');

    // Verify the dashboard is visible
    const isVisible = await dashboardPage.isDashboardVisible();
    console.log('Dashboard visible:', isVisible);
    expect(isVisible).toBeTruthy();
  });

  test('Invalid Sign In - Incorrect Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Perform sign in with invalid password
    await loginPage.signIn('baseemail+1@gmail.com', 'WrongPassword123');

    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid email or password');
  });

  test('Invalid Sign In - Non-Existent Email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Perform sign in with non-existent email
    await loginPage.signIn('nonexistent@example.com', 'SomePassword123');

    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid email or password');
  });

  test('Sign Out', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new SignedInDashboardPage(page);
  
    // Perform sign in
    await loginPage.signIn('arroyoc91+1@gmail.com', 'Dilbert1@');
  
    // Verify the dashboard is visible
    const isVisible = await dashboardPage.isDashboardVisible();
    expect(isVisible).toBeTruthy();
  
    // Perform sign out
    await dashboardPage.clickSignOut();
  
    // Wait for redirection to the login page
    await page.waitForURL('**/playground/auth/login', { timeout: 10000 });
  
    // Verify the URL
    expect(page.url()).toContain('/playground/auth/login');
  });
});
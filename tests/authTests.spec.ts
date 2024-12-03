import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Tests', () => {
  let signInPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the SignInPage object
    signInPage = new LoginPage(page);
    await signInPage.navigate();
  });

  test('Sign in with valid credentials', async ({ page }) => {
    // Input valid credentials
    await signInPage.enterEmail('test@test.com');
    await signInPage.enterPassword('password1');
    await signInPage.clickSignIn();

    // Verify the user is redirected to the dashboard
    // await expect(page).toHaveURL(/.*dashboard/); // Adjust to your app's dashboard URL pattern
    // const welcomeText = await page.locator('[key="welcomeText"]').textContent();
    // expect(welcomeText).toContain('Welcome');
  });
});
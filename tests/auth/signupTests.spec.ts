import { test, expect } from '@playwright/test';
import { SignupPage } from '../../pages/auth/SignupPage';
import { SignedInDashboardPage } from '../../pages/auth/SignedInDashboardPage';

// Helper function to generate a unique email
function generateUniqueEmail(baseEmail: string): string {
  const timestamp = Date.now(); // Generate a unique timestamp
  const [username, domain] = baseEmail.split('@');
  return `${username}+${timestamp}@${domain}`;
}

test.describe('Sign-Up Tests', () => {
  test('Valid Sign Up', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new SignedInDashboardPage(page);

    // Generate a unique email
    const uniqueEmail = generateUniqueEmail('baseemail@gmail.com');

    // Perform sign-up
    await signupPage.signUp(uniqueEmail, 'ValidPassword1!');

    // Verify redirection to the dashboard
    const isVisible = await dashboardPage.isDashboardVisible();
    expect(isVisible).toBeTruthy();

    // Verify the signed-in user's email
    const userEmail = await dashboardPage.getUserEmail();
    expect(userEmail).toBe(uniqueEmail);
  });

  test('Invalid Sign Up - Existing Email', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Perform sign-up with an existing email
    await signupPage.signUp('baseemail+1@gmail.com', 'ValidPassword1!');

    // Verify error message
    const errorMessage = await signupPage.getErrorMessage();
    expect(errorMessage).toContain('Failed to create account');
  });

  test('Invalid Sign Up - Weak Password', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Perform sign-up with a weak password
    await signupPage.signUp('arroyoc91+weakpassword@gmail.com', '123');

    // Verify error message
    const errorMessage = await signupPage.getErrorMessage();
    expect(errorMessage).toContain('Failed to create account');
  });
});
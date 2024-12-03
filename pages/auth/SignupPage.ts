import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SignupPage extends BasePage {
  private emailField: Locator;
  private passwordField: Locator;
  private signUpButton: Locator;
  private errorMessage: Locator;
  private loginLink: Locator;

  constructor(page: Page) {
    super(page); // Pass the page object to the BasePage constructor

    // Initialize locators using the updated IDs from the SignUp component
    this.emailField = this.page.locator('#signup-email');
    this.passwordField = this.page.locator('#signup-password');
    this.signUpButton = this.page.locator('#signup-submit');
    this.errorMessage = this.page.locator('#signup-error');
    this.loginLink = this.page.locator('#login-link');
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async signUp(email: string, password: string) {
    await this.navigateTo('/playground/auth/signup'); // Navigate to the sign-up page
    await this.emailField.fill(email); // Fill email
    await this.passwordField.fill(password); // Fill password
    await this.signUpButton.click(); // Click sign up
  }
}
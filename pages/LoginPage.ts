import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private emailField: Locator;
  private passwordField: Locator;
  private signInButton: Locator;
  private errorMessage: Locator;
  private signUpLink: Locator;

  constructor(page: Page) {
    super(page); // Pass the page object to the BasePage constructor

    // Initialize locators using the updated IDs from the Login component
    this.emailField = this.page.locator('#login-email');
    this.passwordField = this.page.locator('#login-password');
    this.signInButton = this.page.locator('#login-submit');
    this.errorMessage = this.page.locator('#login-error');
    this.signUpLink = this.page.locator('#signup-link');
  }

  async navigate() {
    await this.page.goto('http://localhost:3000/playground/auth/login');
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async getErrorMessage() {
    return this.errorMessage.textContent();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }
}
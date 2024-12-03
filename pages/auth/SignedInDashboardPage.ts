import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class SignedInDashboardPage extends BasePage {
  private dashboardContainer: Locator;
  private dashboardContent: Locator;
  private dashboardHeader: Locator;
  private userEmail: Locator;
  private signOutButton: Locator;

  constructor(page: Page) {
    super(page); // Pass the page object to the BasePage constructor

    // Initialize locators using the IDs from the Dashboard component
    this.dashboardContainer = this.page.locator('#dashboard-container');
    this.dashboardContent = this.page.locator('#dashboard-content');
    this.dashboardHeader = this.page.locator('#dashboard-header');
    this.userEmail = this.page.locator('#user-email');
    this.signOutButton = this.page.locator('#dashboard-signout');
  }

  async getDashboardHeader() {
    return this.dashboardHeader.textContent();
  }

  async getUserEmail() {
    return this.userEmail.textContent();
  }

  async clickSignOut() {
    await this.signOutButton.click();
  }

  async isDashboardVisible(timeout: number = 10000) {
    try {
      // Wait for the dashboard container to be visible within the given timeout
      await this.dashboardContainer.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      // If the element is not visible within the timeout, return false
      return false;
    }
  }
}
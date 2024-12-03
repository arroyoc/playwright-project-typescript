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

  async isDashboardVisible() {
    return this.dashboardContainer.isVisible();
  }
}
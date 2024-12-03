import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(relativeUrl: string) {
    const baseUrl = 'http://localhost:3000'; // Use a base URL for all pages
    await this.page.goto(`${baseUrl}${relativeUrl}`);
  }

  async waitForElement(locator: string, timeout: number = 5000) {
    await this.page.locator(locator).waitFor({ timeout });
  }
}
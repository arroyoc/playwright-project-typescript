import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(relativeUrl: string) {
    const baseUrl = 'https://arroyoautomation.com'; // Use a base URL for all pages
    // const baseUrl = 'http://localhost:3000';
    await this.page.goto(`${baseUrl}${relativeUrl}`);
  }

  async waitForElement(locator: string, timeout: number = 5000) {
    await this.page.locator(locator).waitFor({ timeout });
  }

  async waitForElementVisible(locator: string, timeout: number = 5000) {
    await this.page.locator(locator).waitFor({ state: 'visible', timeout });
  }

  async waitForElementWithText(locator: string, text: string, timeout: number = 5000) {
    await this.page.locator(locator, { hasText: text }).waitFor({ state: 'visible', timeout });
  }
}
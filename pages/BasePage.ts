import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(locator: string, timeout: number = 5000) {
    await this.page.locator(locator).waitFor({ timeout });
  }
}
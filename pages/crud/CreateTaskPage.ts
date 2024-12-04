import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage'; // Assuming you have a BasePage for shared functionality

export class CreateTaskPage extends BasePage {
  private header: Locator;
  private titleInput: Locator;
  private descriptionInput: Locator;
  private statusDropdown: Locator;
  private pendingStatusOption: Locator;
  private inProgressStatusOption: Locator;
  private completedStatusOption: Locator;
  private cancelButton: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.header = this.page.locator('#create-task-header');
    this.titleInput = this.page.locator('#create-task-title');
    this.descriptionInput = this.page.locator('#create-task-description');
    this.statusDropdown = this.page.locator('#create-task-status');
    this.pendingStatusOption = this.page.locator('#create-task-status-pending');
    this.inProgressStatusOption = this.page.locator('#create-task-status-inprogress');
    this.completedStatusOption = this.page.locator('#create-task-status-completed');
    this.cancelButton = this.page.locator('#create-task-cancel');
    this.submitButton = this.page.locator('#create-task-submit');
    this.errorMessage = this.page.locator('#create-task-error');
  }

  async verifyPageHeader(): Promise<boolean> {
    return this.header.isVisible();
  }

  async enterTaskDetails(title: string, description: string, status: 'Pending' | 'In Progress' | 'Completed') {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.statusDropdown.selectOption(status);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
}
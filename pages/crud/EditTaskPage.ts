import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage'; // Assuming a shared BasePage exists

export class EditTaskPage extends BasePage {
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
  private loadingMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.header = this.page.locator('#edit-task-header');
    this.titleInput = this.page.locator('#edit-task-title');
    this.descriptionInput = this.page.locator('#edit-task-description');
    this.statusDropdown = this.page.locator('#edit-task-status');
    this.pendingStatusOption = this.page.locator('#edit-task-status option[value="Pending"]');
    this.inProgressStatusOption = this.page.locator('#edit-task-status option[value="In Progress"]');
    this.completedStatusOption = this.page.locator('#edit-task-status option[value="Completed"]');
    this.cancelButton = this.page.locator('#edit-task-cancel');
    this.submitButton = this.page.locator('#edit-task-submit');
    this.errorMessage = this.page.locator('#edit-task-error');
    this.loadingMessage = this.page.locator('#edit-task-loading');
  }

  async enterTaskDetails(title: string, description: string, status: 'Pending' | 'In Progress' | 'Completed') {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.statusDropdown.selectOption(status);
  }

  async waitForPageToLoad() {
    await this.loadingMessage.waitFor({ state: 'hidden' }); // Wait until the loading message disappears
    await this.header.waitFor({ state: 'visible' }); // Wait until the page header is visible
  }

  async fillTaskDetails(title: string, description: string, status: 'Pending' | 'In Progress' | 'Completed') {
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

  async getCurrentTaskDetails(): Promise<{ title: string; description: string; status: string }> {
    const title = await this.titleInput.inputValue();
    const description = await this.descriptionInput.inputValue();
    const status = await this.statusDropdown.inputValue();
    return { title, description, status };
  }
}
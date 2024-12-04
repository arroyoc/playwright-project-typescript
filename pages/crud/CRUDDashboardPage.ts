import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class CRUDDashboardPage extends BasePage {
  private dashboardHeader: Locator;
  private createTaskButton: Locator;
  private searchInput: Locator;
  private tasksTable: Locator;
  private taskRows: Locator;
  private noTasksMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeader = this.page.locator('#dashboard-header');
    this.createTaskButton = this.page.locator('#create-task-link');
    this.searchInput = this.page.locator('#search-tasks');
    this.tasksTable = this.page.locator('#tasks-table');
    this.taskRows = this.page.locator('tbody tr'); // Targets rows in the task table
    this.noTasksMessage = this.page.locator('#no-tasks-message');
  }

  async verifyDashboardIsVisible(): Promise<boolean> {
    return this.dashboardHeader.isVisible();
  }

  async clickCreateTask() {
    await this.createTaskButton.click();
  }

  async searchTask(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async getTaskList(): Promise<string[]> {
    const rows = await this.taskRows.all();
    return Promise.all(
      rows.map(async (row) => (await row.locator('td:first-child').textContent()) || '')
    );
  }

  async selectTaskById(taskId: string) {
    const taskRow = this.page.locator(`#task-row-${taskId}`);
    await taskRow.click();
  }

  async isNoTasksMessageVisible(): Promise<boolean> {
    return this.noTasksMessage.isVisible();
  }
}
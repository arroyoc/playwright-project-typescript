import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class TaskDetailPage extends BasePage {
  private header: Locator;
  private taskId: Locator;
  private taskTitle: Locator;
  private taskDescription: Locator;
  private taskStatus: Locator;
  private editTaskButton: Locator;
  private deleteTaskButton: Locator;
  private backToDashboardButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locators
    this.header = this.page.locator('#task-details-header');
    this.taskId = this.page.locator('#task-id');
    this.taskTitle = this.page.locator('#task-title');
    this.taskDescription = this.page.locator('#task-description');
    this.taskStatus = this.page.locator('#task-status');
    this.editTaskButton = this.page.locator('#edit-task-link');
    this.deleteTaskButton = this.page.locator('#delete-task-button');
    this.backToDashboardButton = this.page.locator('#back-to-dashboard-link');
  }

  async getTaskId(): Promise<string> {
    return (await this.taskId.textContent()) || '';
  }

  async getTaskTitle(): Promise<string> {
    return (await this.taskTitle.textContent()) || '';
  }

  async getTaskDescription(): Promise<string> {
    return (await this.taskDescription.textContent()) || '';
  }

  async getTaskStatus(): Promise<string> {
    return (await this.taskStatus.textContent()) || '';
  }

  async clickEditTask() {
    await this.editTaskButton.click();
  }

  async clickDeleteTask() {
    await this.deleteTaskButton.click();
  }

  async clickBackToDashboard() {
    await this.backToDashboardButton.click();
  }

  async isTaskDetailVisible(): Promise<boolean> {
    return this.header.isVisible();
  }
}
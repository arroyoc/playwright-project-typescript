import { test, expect } from '@playwright/test';
import { CRUDDashboardPage } from '../../pages/crud/CRUDDashboardPage';
import { CreateTaskPage } from '../../pages/crud/CreateTaskPage';
import { TaskDetailPage } from '../../pages/crud/TaskDetailPage';
import { EditTaskPage } from '../../pages/crud/EditTaskPage';

test.describe('CRUD Functionality Tests', () => {
  test('Create a new task and verify it in the dashboard', async ({ page }) => {
    const dashboardPage = new CRUDDashboardPage(page);
    const createTaskPage = new CreateTaskPage(page);
    const taskDetailPage = new TaskDetailPage(page);

    // Navigate to the CRUD dashboard
    await dashboardPage.navigateTo('/playground/crud');

    // Click "Create Task" button
    await dashboardPage.clickCreateTask();

    // Fill out task details and submit
    const taskTitle = 'Test Task Title';
    const taskDescription = 'Test Task Description';
    const taskStatus = 'Pending';
    await createTaskPage.enterTaskDetails(taskTitle, taskDescription, taskStatus);
    await createTaskPage.clickSubmit();

    // Verify task details in the Task Detail page
    const createdTaskId = await taskDetailPage.getTaskId();
    expect(await taskDetailPage.getTaskTitle()).toBe(taskTitle);
    expect(await taskDetailPage.getTaskDescription()).toBe(taskDescription);
    expect(await taskDetailPage.getTaskStatus()).toBe(taskStatus);

    // Navigate back to the dashboard
    await taskDetailPage.clickBackToDashboard();

    // Search for the task using the Task ID and dynamically wait for it to be visible
    await dashboardPage.searchTask(createdTaskId);
    await dashboardPage.waitForTaskToBeVisible(createdTaskId);

    // Verify the task exists in the dashboard
    const taskList = await dashboardPage.getTaskList();
    expect(taskList).toContain(taskTitle);
  });

  test('Edit an existing task and verify changes', async ({ page }) => {
    const dashboardPage = new CRUDDashboardPage(page);
    const createTaskPage = new CreateTaskPage(page);
    const taskDetailPage = new TaskDetailPage(page);
    const editTaskPage = new EditTaskPage(page);
  
    // Step 1: Create a new task
    await dashboardPage.navigateTo('/playground/crud');
    await dashboardPage.clickCreateTask();
  
    const taskTitle = 'Task to Edit';
    const taskDescription = 'Description before edit';
    const taskStatus = 'Pending';
    await createTaskPage.enterTaskDetails(taskTitle, taskDescription, taskStatus);
    await createTaskPage.clickSubmit();
  
    // Step 2: Get the Task ID from the Task Detail page
    const createdTaskId = await taskDetailPage.getTaskId();
  
    // Step 3: Navigate back to the dashboard
    await taskDetailPage.clickBackToDashboard();
  
    // Step 4: Search and select the task by ID
    await dashboardPage.searchTask(createdTaskId);
    await dashboardPage.waitForTaskToBeVisible(createdTaskId);
    await dashboardPage.selectTaskById(createdTaskId);
  
    // Step 5: Edit the task
    await taskDetailPage.clickEditTask();
    const updatedTitle = 'Edited Task Title';
    const updatedDescription = 'Edited Task Description';
    const updatedStatus = 'Completed';
    await editTaskPage.enterTaskDetails(updatedTitle, updatedDescription, updatedStatus);
    await editTaskPage.clickSubmit();
  
    // Step 6: Search for the task by ID to view its details
    await dashboardPage.searchTask(createdTaskId);
    await dashboardPage.waitForTaskToBeVisible(createdTaskId);
    await dashboardPage.selectTaskById(createdTaskId);
  
    // Step 7: Verify updated task details on Task Detail page
    expect(await taskDetailPage.getTaskTitle()).toBe(updatedTitle);
    expect(await taskDetailPage.getTaskDescription()).toBe(updatedDescription);
    expect(await taskDetailPage.getTaskStatus()).toBe(updatedStatus);
  });

  test('Delete a task and verify it no longer exists in the dashboard', async ({ page }) => {
    const dashboardPage = new CRUDDashboardPage(page);
    const createTaskPage = new CreateTaskPage(page);
    const taskDetailPage = new TaskDetailPage(page);
  
    // Step 1: Create a new task
    await dashboardPage.navigateTo('/playground/crud');
    await dashboardPage.clickCreateTask();
  
    const taskTitle = 'Task to Delete';
    const taskDescription = 'Description of task to delete';
    const taskStatus = 'Pending';
    await createTaskPage.enterTaskDetails(taskTitle, taskDescription, taskStatus);
    await createTaskPage.clickSubmit();
  
    // Step 2: Get the Task ID from the Task Detail page
    const createdTaskId = await taskDetailPage.getTaskId();
  
    // Step 3: Navigate back to the dashboard
    await taskDetailPage.clickBackToDashboard();
  
    // Step 4: Search and select the task by ID
    await dashboardPage.searchTask(createdTaskId);
    await dashboardPage.waitForTaskToBeVisible(createdTaskId);
    await dashboardPage.selectTaskById(createdTaskId);
  
    // Step 5: Verify Task Detail page and delete the task
    await new Promise((resolve) => setTimeout(resolve, 500));
    await taskDetailPage.verifyTaskId(createdTaskId); // Ensure we're on the correct task's detail page
    await taskDetailPage.waitForDeleteButton(); // Wait for delete button to be ready
    await taskDetailPage.clickDeleteTask();
  
    // Step 6: Verify the task is no longer in the dashboard
    await dashboardPage.searchTask(createdTaskId); // Search by Task ID
    const taskList = await dashboardPage.getTaskList();
    expect(taskList).not.toContain(createdTaskId); // Verify Task ID is absent
  });
});
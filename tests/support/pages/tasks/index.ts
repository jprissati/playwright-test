import { Locator, Page, expect } from '@playwright/test'
import { TaskModel } from '../../../../fixtures/task.model'

export class TasksPage {
  readonly page: Page
  readonly newTask: Locator

  constructor(page: Page) {
    this.page = page
    this.newTask = page.locator('#newTask')
  }

  async go() {
    await this.page.goto('/')
  }

  async create(taskJson: TaskModel) {
    await this.newTask.fill(taskJson.name)
    await this.page.click('css=button >> text=Create')
  }

  async toggle(taskJson: string) {
    const target = this.page.locator(
      `xpath=//p[text()="${taskJson}"]/..//button[contains(@class, "Toggle")]`,
    )
    await target.click()
  }

  async remove(taskJson: string) {
    const target = this.page.locator(
      `xpath=//p[text()="${taskJson}"]/..//button[contains(@class, "Delete")]`,
    )
    await target.click()
  }

  async shouldHaveText() {
    const target = this.page.getByTestId('task-item')
    await expect(target).toBeVisible
  }

  async shouldNotexist() {
    const target = this.page.getByTestId('task-item')
    await expect(target).not.toBeVisible
  }

  async alertHaveText(text: string) {
    const target = this.page.locator('.swal2-html-container')
    await expect(target).toHaveText(text)
  }

  async shloudBeDone(taskJson: string) {
    const target = this.page.getByText(taskJson)
    await expect(target).toHaveCSS('text-decoration-line', 'line-through')
  }
}

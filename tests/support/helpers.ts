import { expect, APIRequestContext } from '@playwright/test'
import { TaskModel } from '../../fixtures/task.model'

require('dotenv').config()

const BASE_API = process.env.BASE_API
export async function deleteTaskByHelper(
  request: APIRequestContext,
  taskJson: string,
) {
  await request.delete(`${BASE_API}/helper/tasks/${taskJson}`)
}

export async function postTask(
  request: APIRequestContext,
  taskJson: TaskModel,
) {
  const postNewTask = await request.post(`${BASE_API}/tasks`, {
    data: taskJson,
  })
  expect(postNewTask.ok()).toBeTruthy
}

import { expect, test } from '@playwright/test'
import { TaskModel } from '../fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import { setTimeout } from 'timers/promises'
import data from '../fixtures/tasks.json'

let tasksPage: TasksPage

test.beforeEach(({ page }) => {
  tasksPage = new TasksPage(page)
})

test.describe('cadastro', () => {
  test('deve poder cadastrar uma nova tarefa', async ({ request }) => {
    const taskJson = data.success as TaskModel

    await deleteTaskByHelper(request, taskJson.name)

    await tasksPage.go()
    await tasksPage.create(taskJson)
    await tasksPage.shouldHaveText()
  })

  test('não deve permitir tarefa duplicada', async ({ request }) => {
    const taskJson = data.duplicate as TaskModel

    await deleteTaskByHelper(request, taskJson.name)
    await postTask(request, taskJson)

    await tasksPage.go()
    await tasksPage.create(taskJson)

    await tasksPage.alertHaveText('Task already exists!')
  })

  test('campo obrigatório', async ({}) => {
    const taskJson = data.required as TaskModel

    await tasksPage.go()
    await tasksPage.create(taskJson)

    const validationMessage = await tasksPage.newTask.evaluate(
      (e) => (e as HTMLInputElement).validationMessage,
    )
    expect(validationMessage).toEqual('This is a required field')
    await setTimeout(300)
  })
})

test.describe('atualização', () => {
  test('deve concluir uma tarefa', async ({ request }) => {
    const taskJson = data.update as TaskModel

    await deleteTaskByHelper(request, taskJson.name)
    await postTask(request, taskJson)

    await tasksPage.go()
    await tasksPage.toggle(taskJson.name)
    await tasksPage.shloudBeDone(taskJson.name)
  })
})

test.describe('exclusão', () => {
  test('deve excluir uma tarefa', async ({ request }) => {
    const taskJson = data.delete as TaskModel

    await deleteTaskByHelper(request, taskJson.name)
    await postTask(request, taskJson)

    await tasksPage.go()
    await tasksPage.remove(taskJson.name)
    await tasksPage.shouldNotexist()
  })
})

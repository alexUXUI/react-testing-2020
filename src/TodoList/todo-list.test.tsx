import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { TodoList, useList, useApi } from './todo-list.component'

test('Should have the necessary elements', async () => {
  const { container, getByTestId } = render(<TodoList />)

  const todosElement = getByTestId('todos')
  const todosTitle = getByTestId('todos__title')
  const todoInput = getByTestId('todo__input')

  expect(todosElement).toBeInTheDocument()
  expect(todosTitle.className).toBe('todos__title')
  expect(todoInput).toBeInTheDocument()
  expect(container).toBeInTheDocument()
})

test('Show show the list of todods', async () => {
  const { getAllByTestId } = render(<TodoList />)
  const todos = getAllByTestId('todo__item')

  expect(todos[0].textContent).toBe('Learn TestingDeleteDone')
})

test('Should be able to add a new todo', async () => {
  const { getByTestId, findByText } = render(<TodoList />)
  const input = getByTestId('todo__input')
  const button = getByTestId('todo__button')

  fireEvent.change(input, { target: { value: 'take out trash' } })
  fireEvent.click(button)

  const newItem = await waitForElement(() => findByText('take out trash'))

  expect(newItem.textContent).toBe('take out trashDeleteDone')
  expect(input.value).toBe('')
})

test('Should delete an item', async () => {
  const { getByText, getByTestId } = render(<TodoList />)
  const deleteButton = getByText('Delete')

  fireEvent.click(deleteButton)

  const updatedTodos = await waitForElement(() => getByTestId('todos__list'))
  expect(updatedTodos.children.length).toBe(0)
})

test('Should toggle complete a todo task', async () => {
  const { getByTestId, getByText } = render(<TodoList />)
  const itemToComplete = getByText('Learn Testing')

  expect(itemToComplete.style.color).toBe('black')
  const completeButton = getByTestId('todo__toggle')

  fireEvent.click(completeButton)

  const completedItem = await waitForElement(() => getByTestId('todo__item'))
  expect(completedItem.style.color).toBe('rgb(234, 234, 234)')
})

test('hook', () => {
  const { result } = renderHook(() => useList())

  const setState = result.current[1]

  act(() =>
    setState([
      { id: 0, name: 'Learn Testing', complete: false },
      { id: 1, name: 'Test Hooks', complete: true }
    ])
  )

  expect(result.current[0]).toHaveLength(2)
})

test('apihook', async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useApi('https://jsonplaceholder.typicode.com/todos/2')
  )

  console.log(result.current)
})

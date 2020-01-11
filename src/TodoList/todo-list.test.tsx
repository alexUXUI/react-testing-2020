import React from 'react'
import { render } from '@testing-library/react'
import { TodoList } from './todo-list.component'

test('Should have the necessary elements', async () => {
  const { getByTestId } = render(<TodoList />)
  const todoList = getByTestId('todo__list')
  expect(todoList).toBeInTheDocument()
})

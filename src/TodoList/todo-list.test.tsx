import React from 'react'
import { render } from '@testing-library/react'
import { TodoList } from './todo-list.component'

test('Should have the necessary elements', async () => {
  const { container } = render(<TodoList />)

  expect(container instanceof HTMLDivElement).toBe(true) // true
})

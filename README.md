### Testing in React in 2020

Welcome to the current state of react testing. It is
defined by the use of Testing Library React,
which has replaced Enzyme as the standard way to unit
test React apps.

In this repo, we are going to Test Drive a todo list application using Testing Library React. Along the way,
we will highlight some of the features of this new library.

All relevant code for this exercise is located in `src/TodoList`

Lets begin:

Notice how right off the bat we have two files, our app source code `todo-list.component.tsx` as well as our unit tests for this feature in `todo-list.test.tsx`

We'll start with `todo-list.test.tsx`.

To Begin, we're going to import a couple of things we will need to write tests.

First, we need to bring in react. This is because the tests work on top of React and JSX

`import React from 'react'`

Next, we need to bring in our testing library

`import { render } from '@testing-library/react'`

From our testing library, we are bringing in the render method. The render method takes a react element and renders it to a DOM within a `container` `<div />`. This is very important in terms of general understanding of how Testing Library works.

To reiterate, the render function has a signature like this:

type render = (element: ReactElement) => <div><rendered html here /></div>

Finally, we are going to include our application code so we have something to test

`import { TodoList } from './todo-list.component'`

This is what our Todo List code currently looks like:

```tsx
import React from 'react'

export const TodoList: React.FC = () => {
  return <div data-testid="todos"></div>
}
```

Let's dive in with some tests!

The syntax for a test in Testing library is a funciton named `test` which takes to arguements: the name of the test, a call back function where
the test is defiend.

```jsx
test('Should have the necessary elements', () => {})
```

Let's go ahead and fill this test out. To do this, we need to use Testing Library React to find the elements we will need to have a working ToDo list.

What are the elements we will need for a basic todo list?

1. A list
2. An input form to name new list items
3. A submit button to add the new items to the list

Let's go ahead and write a test that renders our list component, and then inspect the HTML within the `container` div that gets returned from the render Method.

```tsx
test('Should have the necessary elements', () => {
  const { container } = render(<TodoList />)
})
```

As you can see, the render method returns an object which has a container object on it. This container object is regular HTML. As such, you can interact with it just like you would interact with the DOM and any DOM element. For example, we
can get attributes like constainer.style or properties like
container.textContent.

Let's verify that our container element is indeed a `<div />`
Let's log our container and see what gets returned

```tsx
test('Should have the necessary elements', async () => {
  const { container } = render(<TodoList />)

  expect(container instanceof HTMLDivElement).toBe(true) // true
})
```

As you can see, we've added our first `assertion` with the `expect` method. Go ahead and run the test runner now that we have a test!

in the root of this directory run:

```shell
$ yarn test
```

and you should see the output:

```shell
src/TodoList/todo-list.test.tsx
  ✓ Should have the necessary elements (4ms)
```

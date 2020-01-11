### Testing in React in 2020

Welcome to the current state of react testing. It is
defined by the use of Testing Library React (TLR),
which has replaced Enzyme as the standard way to unit
test React apps.

In this repo, we are going to _Test Drive_ a todo list application using Testing Library React. Along the way,
we will highlight some of the features of TLR.

All relevant code for this exercise is located in `src/TodoList`

#### Setting up Test Dependencies

Within `src/TodoList` we have two files:

1. App source code `todo-list.component.tsx`
2. Unit tests for this feature in `todo-list.test.tsx`

We'll start with `todo-list.test.tsx`.

Let's import a couple of dependencies we will need to write tests.

1. React
2. Testing Library React (TLR)
3. Our App code

First, we need to bring in react. This is because our app code
is written in react.

```tsx
import React from 'react'
```

Next, we need to bring in our testing library.

```tsx
import { render } from '@testing-library/react'
```

From TLR, we are bringing in the `render` method. The `render` method takes a react element and renders it to a DOM within a `<div />` element.

This

```html
<div></div>
```

is called the `container` in TLR and it is _always_ wrapped around your compiled react code.

For our last dependency, we are going to include our application code so we have something to test.

```tsx
import { TodoList } from './todo-list.component'
```

This is what our Todo List code currently looks like:

```tsx
import React from 'react'

export const TodoList: React.FC = () => {
  return <div data-testid="todos"></div>
}
```

Now that we have everything we need, let's dive in with some tests!

#### Writing our first test

The syntax for a test in Testing library is a function named `test` which takes to arguments: the name of the test, a call back function where
the test is defined.

```jsx
test('Should have the necessary elements', () => {})
```

Let's go ahead and fill this test out. To do this, we need to use TLR to find the elements we will need to have a working ToDo list.

But first: What are the elements we will need for a basic todo list?

1. A list element
2. An input form to name new list items
3. A submit button to add the new items to the list

Let's go ahead and write a test that renders our list component, and then inspects the HTML within the `container` div that gets returned from the render Method.

```tsx
test('Should have the necessary elements', () => {
  const { container } = render(<TodoList />)
})
```

#### Container Object

As you can see, the render method returns an object which has a container object on it. This container object is regular HTML. As such, you can interact with it just like you would interact with the DOM and any DOM element. For example, we
can get attributes like constainer.style or properties like
container.textContent.

Let's verify that our container element is indeed a `<div />`
Let's test our container and see what gets returned:

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

Nice work! Let's refer to our next section to complete our first unit test which will query the DOM for the elements we need. (see branch first-test-querying)

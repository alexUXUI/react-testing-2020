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

First, we'll bring in react.

```tsx
import React from 'react'
```

Next, we'll bring in our testing library.

```tsx
import { render } from '@testing-library/react'
```

Next, we'll bring in the render mehtod from TLR. The render method
takes our React JSX code, compiles it, render it to HTML, ad returns
a DOM with the output HTML for us to interact with in our tests.

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

Now that we have everything we need, let's dive in with some tests! 🎉

#### Writing our first test

The syntax for a test in Testing library React (TLR) starts with a function named `test`. This function takes two arguments:

1. The name of the test
2. A callback function where the test is defined.

```jsx
test('Should have the necessary elements', () => {
  // test goes here
})
```

The test specifies that the app has all the necessary markup so let's go ahead and fill this test out. To do this, we need to use TLR to find the elements we will need to have a working ToDo list.

But first: What are the elements we will need for a basic todo list? 👀

1. A list element
2. An input form to name new list items
3. A submit button to add the new items to the list

Let's update our test so that it renders our `<TodoList />` component, and then inspects the HTML within the `container` div that gets returned from the render Method.

```tsx
test('Should have the necessary elements', () => {
  const { container } = render(<TodoList />)
})
```

#### Container Object

As you can see, the render method returns an object
which has a `container` object on it. The `container` is a wrapper `<div>` that TLR wraps around HTML resulting from the `render` method.

Since the `container` object is a HTML div, we can interact with the `container` object just like we would interact with the DOM and any DOM element. For example, we can get properties like `constainer.style` or methods like `container.getAttribute()`. It's purpose is to provide a consistent way to handle the output of the `render` method.

With that in mind, let's verify that our container element is indeed a `<div />`

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

#### First Lesson Continued: Querying the DOM

In the last section, we learned how to set up TLR and we also learned
about the render method. In terms of the render method, we learned that it returns a `container` object that is a wrapper for the HTML of our applicaiton.

```tsx
const { container } = render(<TodoList />)
```

In this section we will learn that in a addition to the container object, the render method also returns all the helper methods we
need to interact with the container.

### TLR Test Methods

In addition to returning a `container` object, the render methods also returns all the helpers we will need to test our app.

Let's take a look at a method we can get from the `render` output.

```tsx
const { container, findByText } = render(<TodoList />)
```

As you can see, this method is called `findByText`. It is a method that takes a single argument of type string, and searches the `container` object for a single instance of that string.

We use it like so

```ts
const myElement = findByText('Todo List:')
```

Notice how we didn't pass the container to the `findByText` method? That's because the findByText method already has access to the underlying `container` object.

#### Querying the DOM for elements

In the previous lesson, we started to write a test that checks to make sure our todo list has all the necessary elements.

```tsx
test('Should have the necessary elements', async () => {
  const { container } = render(<TodoList />)

  expect(container instanceof HTMLDivElement).toBe(true) // true
})
```

Let's use our new knowledge about TLR methods to bring in some methods we could use to query the DOM of our Todo app. We're going to update our test as follows:

1. Delete previous assertion becasue we dont need to test the testing framework
2. Delete the container import because we already have access to it through
   our query methods
3. Bring the `getByTestId` test method in

```tsx
test('Should have the necessary elements', async () => {
  const { getByTestId } = render(<TodoList />)
  const todoList = getByTestId('todo__list')
  expect(todoList).toBeInTheDocument()
})
```

Notice our `expect` assertion is being chained to a command called `toBeInTheDocument()`? This is another test method that we have access to, but instead of getting it from TLR, this method comes from `Jest` because we're using `Jest` as our test runner and assertion library.

Great! Now run the tests again:

```shell
$ yarn test
```

The test _should_ fail with the following output:

```shell
Should have the necessary elements
 ❌ Unable to find an element by: [data-testid="todo__list"]
```

Awesome! We're test diving this thing. Let's make the test pass. To do that,
we'll to create a `<ul>` in our applicaiton code and we'll get it a HTML data attribute of `data-testid`.

> Note: In order to work with the `getByTestId`method, the attribute needs to be `data-testid`

OK, lets go to todo-list.component.tsx and update our component to be:

```tsx
export const TodoList: React.FC = () => {
  return <div data-testid="todos"><ul data-testid="todo__list"></div>
}
```

Run the test again and you should see

```shell
 PASS  src/TodoList/todo-list.test.tsx
  ✓ Should have the necessary elements (27ms)
```

Congratulations! You've just used your first test methods to test-drive
a react app. Kent Dodds would be proud!

#### Activity Section

Now that we know about querying the DOM, let's finish this first test to include the rest of the elements our basic todo list will need. The elements we mentioned in the first section are:

1. List (test completed)
2. Text input
3. Submit button

Be sure to write the tests for 2 and 3 first, let them fail, and then make them pass with new component code. The answer to this section is in the next branch.

In the next lesson, we're going to learn how to to interact with the
DOM through simulated events like button clicks and text input.

Please checkout the branch `second-test-querying`

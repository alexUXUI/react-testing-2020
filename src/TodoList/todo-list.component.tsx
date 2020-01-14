import React, { SetStateAction, Dispatch } from 'react'

type Todo = { id: number; name: string; complete: boolean }
type TodoStateHook = [Todo[], Dispatch<SetStateAction<Todo[]>>]
type InputStateHook = [string, Dispatch<SetStateAction<string>>]
type TodoCustomHook = () => TodoStateHook

export const useList: TodoCustomHook = () => {
  const [todos, setTodos]: TodoStateHook = React.useState<Todo[]>([
    { id: 0, name: 'Learn Testing', complete: false }
  ])

  return [todos, setTodos]
}

interface ApiHookState<T> {
  state: T
  loading: boolean
}

export function useApi(endpoint: string): ApiHookState<string> {
  const [state, setState] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect((): void => {
    fetch(endpoint)
      .then((response: Response): void => {
        if (response.status === 200) {
          response.json().then((data: { title: string }) => {
            setState(data.title)
            setLoading(false)
          })
        }
        setLoading(false)
      })
      .catch((err: Error) => {
        setLoading(false)
      })
  }, [endpoint])

  return {
    state,
    loading
  }
}

export const TodoList: React.FC = () => {
  const [todos, setTodos]: TodoStateHook = useList()
  const [inputValue, setInputValue]: InputStateHook = React.useState<string>('')

  return (
    <div data-testid="todos">
      <h3 data-testid="todos__title" className="todos__title">
        Todo List
      </h3>
      <ul data-testid="todos__list">
        {todos &&
          todos.map(
            (todo: Todo): JSX.Element => {
              return (
                <li
                  key={`${todo.name} + ${todo.id}`}
                  data-testid="todo__item"
                  style={{ color: todo.complete ? '#eaeaea' : 'black' }}
                >
                  {todo.name}
                  <button
                    data-testid="todo__delete"
                    onClick={e => {
                      setTodos(todos.filter((newTodo: Todo): Boolean => todo.id !== newTodo.id))
                    }}
                  >
                    Delete
                  </button>
                  <button
                    data-testid="todo__toggle"
                    onClick={e => {
                      setTodos(
                        todos.map(
                          (currentTodo: Todo): Todo => {
                            return todo.id === currentTodo.id
                              ? {
                                  ...currentTodo,
                                  complete: !currentTodo.complete
                                }
                              : currentTodo
                          }
                        )
                      )
                    }}
                  >
                    Done
                  </button>
                </li>
              )
            }
          )}
      </ul>
      <input
        type="text"
        value={inputValue}
        data-testid="todo__input"
        onChange={e => setInputValue(e.target.value)}
      />
      <button
        data-testid="todo__button"
        onClick={e => {
          setTodos([...todos, { id: todos.length + 1, name: inputValue, complete: false }])
          setInputValue('')
        }}
      >
        Add Item
      </button>
    </div>
  )
}

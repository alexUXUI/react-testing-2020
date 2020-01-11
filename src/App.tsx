import React from 'react'
import './App.css'
import { TodoList } from './TodoList/todo-list.component'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>ToDo App:</h1>
      <TodoList />
    </div>
  )
}

export default App

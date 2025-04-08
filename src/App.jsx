// https://64f5e3672b07270f705dda32.mockapi.io/todo

import React, { useEffect, useState } from 'react';
import './css/style.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';

const App = () => {

  const [todoList, setTodoList] = useState([]);
  const [themeColor, setThemeColor] = useState(getTheme());

  function getTheme() {
    const getThemeToggle = localStorage.getItem('theme')
    if(getThemeToggle == 'dark') {
      return 'dark'
    } else {
      return 'light'
    }
  }

  const getTodoList = async () => {

    const res = await fetch('https://64f5e3672b07270f705dda32.mockapi.io/todo')
    const data = await res.json()
    setTodoList(data)
    
  }

  const addNewTodo = (title) => {

    if (title !== '') {

      const newTodoItem = { id: Date.now(), title, status: false }
      setTodoList([...todoList, newTodoItem])

      fetch('https://64f5e3672b07270f705dda32.mockapi.io/todo', {
        method: 'POST',
        body: JSON.stringify(newTodoItem),
        headers: { 'content-type': 'application/json' }
      }).then(() => getTodoList())
    }

  }

  const editTodoItem = (id, values) => {
    const editTodo = todoList.find(item => item.id == id)
    const newItem = {...editTodo, title: values}
    
    fetch(`https://64f5e3672b07270f705dda32.mockapi.io/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newItem),
      headers: { 'content-type': 'application/json' }
    }).then(() => getTodoList())
  }

  const deleteTodo = (id) => {

    fetch(`https://64f5e3672b07270f705dda32.mockapi.io/todo/${id}`, {
      method: 'DELETE'
    }).then(() => getTodoList())

  }

  const checkTodo = (id) => {
    const checkTodo = todoList.find(item => item.id == id)
    const newItem = {...checkTodo, status: !checkTodo.status}

    fetch(`https://64f5e3672b07270f705dda32.mockapi.io/todo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newItem),
      headers: { 'content-type': 'application/json' }
    }).then(() => getTodoList())
  }

  const toggleTheme = () => {
    setThemeColor(themeColor == 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    getTodoList()
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', themeColor)
  }, [themeColor])

  return (
    <div className={`wrapper ${themeColor}`}>
      <div className="todo-wrapper">
        <div className="todo-header">
          <div className="toggle-theme-wrapper">
            <div className='toggle-theme'>
            <div className={themeColor == 'light' ? 'toggle-theme-btn' : 'toggle-theme-btn active'} onClick={toggleTheme}></div>
          </div>
          <h4 className='toggle-theme-title'>{themeColor == 'light' ? 'Светлая' : 'Темная'}</h4>
          </div>
          <h1 className='todo-title'>My Todo App</h1>
        </div>
        <InputTodo addNewTodo={addNewTodo} />
        <TodoList title='Активные' list={todoList} editTodoItem={editTodoItem} deleteTodo={deleteTodo} checkTodo={checkTodo} />
        <TodoList title='Завершенные' list={todoList} editTodoItem={editTodoItem} deleteTodo={deleteTodo} checkTodo={checkTodo} sort />
      </div>
    </div>
  );
}

export default App;


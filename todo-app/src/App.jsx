import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [newTodo, setNewTodo] = useState('')

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }
      setTodos([...todos, newTodoItem])
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="app">
      <div className="todo-container">
        <header className="header">
          <h1>Todo App</h1>
          <p className="subtitle">Stay organized and get things done</p>
        </header>

        <TodoForm 
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          onAddTodo={addTodo}
        />

        {todos.length > 0 && (
          <>
            <TodoStats 
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={todos.length}
            />

            <TodoFilters 
              filter={filter}
              setFilter={setFilter}
            />

            <TodoList 
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />

            {completedCount > 0 && (
              <button 
                className="clear-completed"
                onClick={clearCompleted}
              >
                Clear Completed ({completedCount})
              </button>
            )}
          </>
        )}

        {todos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No todos yet</h3>
            <p>Add your first todo above to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function TodoForm({ newTodo, setNewTodo, onAddTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTodo(newTodo)
    setNewTodo('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit" className="add-button">
        Add Todo
      </button>
    </form>
  )
}

function TodoStats({ activeCount, completedCount, totalCount }) {
  return (
    <div className="todo-stats">
      <div className="stat">
        <span className="stat-number">{activeCount}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat">
        <span className="stat-number">{completedCount}</span>
        <span className="stat-label">Completed</span>
      </div>
      <div className="stat">
        <span className="stat-number">{totalCount}</span>
        <span className="stat-label">Total</span>
      </div>
    </div>
  )
}

function TodoFilters({ filter, setFilter }) {
  return (
    <div className="todo-filters">
      <button 
        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button 
        className={`filter-button ${filter === 'active' ? 'active' : ''}`}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button 
        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  )
}

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    }
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button
        className="toggle-button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed ? '✓' : '○'}
      </button>

      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <span 
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        <button
          className="edit-button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit todo"
        >
          ✏️
        </button>
        <button
          className="delete-button"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default App
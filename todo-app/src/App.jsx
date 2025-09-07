import { useState, useEffect } from 'react'
import { todoService, authService } from './lib/supabase'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Load user and todos on component mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get current user
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
        
        // Load todos
        await loadTodos(currentUser?.id)
      } catch (err) {
        console.error('Error initializing app:', err)
        setError('Failed to load data. Using offline mode.')
        // Fallback to localStorage if Supabase is not configured
        loadLocalStorageTodos()
      } finally {
        setLoading(false)
      }
    }

    initializeApp()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        await loadTodos(session.user.id)
      } else {
        setTodos([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadTodos = async (userId = null) => {
    try {
      setError(null)
      const data = await todoService.getTodos(userId)
      setTodos(data)
    } catch (err) {
      console.error('Error loading todos:', err)
      setError('Failed to load todos from server')
      // Fallback to localStorage
      loadLocalStorageTodos()
    }
  }

  const loadLocalStorageTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  const addTodo = async (text) => {
    if (text.trim() === '') return

    try {
      setError(null)
      
      if (user) {
        // Add to Supabase
        const newTodoItem = await todoService.addTodo(text, user.id)
        setTodos(prev => [newTodoItem, ...prev])
      } else {
        // Fallback to localStorage
        const newTodoItem = {
          id: Date.now(),
          text: text.trim(),
          completed: false,
          created_at: new Date().toISOString()
        }
        const updatedTodos = [newTodoItem, ...todos]
        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
      }
    } catch (err) {
      console.error('Error adding todo:', err)
      setError('Failed to add todo')
    }
  }

  const toggleTodo = async (id) => {
    try {
      setError(null)
      const todo = todos.find(t => t.id === id)
      if (!todo) return

      if (user) {
        // Update in Supabase
        const updatedTodo = await todoService.updateTodo(id, { 
          completed: !todo.completed 
        })
        setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t))
      } else {
        // Update in localStorage
        const updatedTodos = todos.map(t =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
      }
    } catch (err) {
      console.error('Error toggling todo:', err)
      setError('Failed to update todo')
    }
  }

  const deleteTodo = async (id) => {
    try {
      setError(null)
      
      if (user) {
        // Delete from Supabase
        await todoService.deleteTodo(id)
        setTodos(prev => prev.filter(t => t.id !== id))
      } else {
        // Delete from localStorage
        const updatedTodos = todos.filter(t => t.id !== id)
        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
      }
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete todo')
    }
  }

  const editTodo = async (id, newText) => {
    if (newText.trim() === '') return

    try {
      setError(null)
      
      if (user) {
        // Update in Supabase
        const updatedTodo = await todoService.updateTodo(id, { 
          text: newText.trim() 
        })
        setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t))
      } else {
        // Update in localStorage
        const updatedTodos = todos.map(t =>
          t.id === id ? { ...t, text: newText.trim() } : t
        )
        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
      }
    } catch (err) {
      console.error('Error editing todo:', err)
      setError('Failed to edit todo')
    }
  }

  const clearCompleted = async () => {
    try {
      setError(null)
      
      if (user) {
        // Delete from Supabase
        await todoService.deleteCompletedTodos(user.id)
        setTodos(prev => prev.filter(t => !t.completed))
      } else {
        // Delete from localStorage
        const updatedTodos = todos.filter(t => !t.completed)
        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
      }
    } catch (err) {
      console.error('Error clearing completed todos:', err)
      setError('Failed to clear completed todos')
    }
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

  if (loading) {
    return (
      <div className="app">
        <div className="todo-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your todos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="todo-container">
        <header className="header">
          <h1>Todo App</h1>
          <p className="subtitle">Stay organized and get things done</p>
          {user && (
            <div className="user-info">
              <span>Welcome, {user.email}!</span>
              <button 
                className="sign-out-btn"
                onClick={() => authService.signOut()}
              >
                Sign Out
              </button>
            </div>
          )}
          {!user && (
            <div className="auth-notice">
              <p>Running in offline mode. <AuthModal /> for cloud sync.</p>
            </div>
          )}
        </header>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

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

function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        await authService.signUp(email, password)
        alert('Check your email for verification link!')
      } else {
        await authService.signIn(email, password)
      }
      setIsOpen(false)
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button className="auth-trigger" onClick={() => setIsOpen(true)}>
        Sign In
      </button>
    )
  }

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-text">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            type="button"
            className="link-button"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
        <button className="close-button" onClick={() => setIsOpen(false)}>
          ×
        </button>
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
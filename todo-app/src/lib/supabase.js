import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database functions for todos
export const todoService = {
  // Get all todos for the current user
  async getTodos(userId = null) {
    try {
      let query = supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      // If userId is provided, filter by user_id
      if (userId) {
        query = query.eq('user_id', userId)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching todos:', error)
      return []
    }
  },

  // Add a new todo
  async addTodo(text, userId = null) {
    try {
      const todoData = {
        text: text.trim(),
        completed: false,
        created_at: new Date().toISOString()
      }

      // Add user_id if provided
      if (userId) {
        todoData.user_id = userId
      }

      const { data, error } = await supabase
        .from('todos')
        .insert([todoData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding todo:', error)
      throw error
    }
  },

  // Update a todo
  async updateTodo(id, updates) {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating todo:', error)
      throw error
    }
  },

  // Delete a todo
  async deleteTodo(id) {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting todo:', error)
      throw error
    }
  },

  // Delete all completed todos
  async deleteCompletedTodos(userId = null) {
    try {
      let query = supabase
        .from('todos')
        .delete()
        .eq('completed', true)

      // If userId is provided, filter by user_id
      if (userId) {
        query = query.eq('user_id', userId)
      }

      const { error } = await query

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting completed todos:', error)
      throw error
    }
  }
}

// Authentication helper functions
export const authService = {
  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  },

  // Sign up with email and password
  async signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  },

  // Listen to auth changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
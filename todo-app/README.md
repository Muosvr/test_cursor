# React Todo App

A beautiful, modern todo list application built with React and Vite. This app helps you stay organized and get things done with a clean, intuitive interface.

## Features

### ✨ Core Functionality
- **Add Todos**: Create new tasks with a simple form
- **Mark Complete**: Toggle todos between active and completed states
- **Edit Todos**: Double-click any todo to edit it inline
- **Delete Todos**: Remove todos you no longer need
- **Persistent Storage**: Your todos are automatically saved to localStorage

### 🎯 Advanced Features
- **Smart Filtering**: View all todos, only active ones, or completed ones
- **Statistics Dashboard**: See your progress with active, completed, and total counts
- **Bulk Actions**: Clear all completed todos at once
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Delightful transitions and hover effects
- **Accessibility**: Full keyboard navigation and screen reader support

### 🎨 Design Features
- **Modern UI**: Clean, gradient-based design with glassmorphism effects
- **Dark/Light Adaptation**: Automatically adapts to system preferences
- **Mobile-First**: Optimized for all screen sizes
- **Smooth Interactions**: Hover effects, transitions, and micro-animations
- **Empty State**: Helpful guidance when no todos exist

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding Todos
1. Type your task in the input field at the top
2. Press Enter or click the "Add Todo" button
3. Your todo will appear in the list below

### Managing Todos
- **Complete**: Click the circle button next to any todo to mark it as complete
- **Edit**: Double-click on any todo text to edit it inline
- **Delete**: Hover over a todo and click the trash icon to delete it

### Filtering
Use the filter buttons to view:
- **All**: Show all todos (default)
- **Active**: Show only incomplete todos
- **Completed**: Show only completed todos

### Bulk Actions
- **Clear Completed**: When you have completed todos, a "Clear Completed" button will appear to remove all completed items at once

## Technical Details

### Built With
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom CSS with modern features like CSS Grid, Flexbox, and CSS Variables
- **localStorage**: For persistent data storage

### Project Structure
```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
├── index.css        # Global styles and resets
└── main.jsx         # Application entry point
```

### Key Components
- **App**: Main container with state management
- **TodoForm**: Input form for adding new todos
- **TodoStats**: Statistics display showing counts
- **TodoFilters**: Filter buttons for different views
- **TodoList**: Container for all todo items
- **TodoItem**: Individual todo with actions

### Features Implementation
- **State Management**: Uses React's `useState` and `useEffect` hooks
- **Local Storage**: Automatically saves and loads todos
- **Responsive Design**: CSS media queries for different screen sizes
- **Animations**: CSS transitions and keyframe animations
- **Accessibility**: ARIA labels and keyboard navigation support

## Browser Support

This app works in all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
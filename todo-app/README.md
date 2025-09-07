# React Todo App with Supabase Backend

A beautiful, modern todo list application built with React, Vite, and Supabase. This app helps you stay organized and get things done with a clean, intuitive interface and cloud synchronization across all your devices.

## Features

### ✨ Core Functionality
- **Add Todos**: Create new tasks with a simple form
- **Mark Complete**: Toggle todos between active and completed states
- **Edit Todos**: Double-click any todo to edit it inline
- **Delete Todos**: Remove todos you no longer need
- **Cloud Sync**: Your todos are automatically synced to Supabase database
- **Offline Support**: Falls back to localStorage when offline

### 🔐 Authentication & Security
- **User Authentication**: Sign up and sign in with email/password
- **Secure Data**: Row Level Security (RLS) ensures users only see their own todos
- **Session Management**: Automatic session handling and persistence
- **Guest Mode**: Works offline without authentication for quick use

### 🎯 Advanced Features
- **Smart Filtering**: View all todos, only active ones, or completed ones
- **Statistics Dashboard**: See your progress with active, completed, and total counts
- **Bulk Actions**: Clear all completed todos at once
- **Real-time Updates**: Changes sync instantly across all your devices
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Delightful transitions and hover effects
- **Accessibility**: Full keyboard navigation and screen reader support

### 🎨 Design Features
- **Modern UI**: Clean, gradient-based design with glassmorphism effects
- **Dark/Light Adaptation**: Automatically adapts to system preferences
- **Mobile-First**: Optimized for all screen sizes
- **Smooth Interactions**: Hover effects, transitions, and micro-animations
- **Empty State**: Helpful guidance when no todos exist
- **Loading States**: Smooth loading indicators for better UX

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- A Supabase account (free at [supabase.com](https://supabase.com))

### 1. Supabase Setup

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project" and fill in the details:
   - **Organization**: Choose or create one
   - **Project Name**: `todo-app` (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
3. Wait for the project to be set up (usually takes 1-2 minutes)

#### Set up the Database
1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste it into the SQL editor and click **Run**
4. This will create:
   - `todos` table with proper structure
   - Row Level Security (RLS) policies
   - Indexes for better performance
   - Automatic `updated_at` trigger

#### Get Your Project Credentials
1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon Public Key** (starts with `eyJ...`)

### 2. Local Development Setup

#### Clone and Install Dependencies
```bash
# Navigate to your project directory
cd todo-app

# Install dependencies (if not already done)
npm install
```

#### Environment Configuration
1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

#### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Authentication Setup (Optional)

The app includes built-in authentication, but you may want to configure additional settings:

#### Email Templates (Recommended)
1. In Supabase dashboard, go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - **Confirm signup**: Welcome message and email verification
   - **Reset password**: Password reset instructions
   - **Magic link**: For passwordless login (if you add this feature)

#### Email Provider Configuration
1. Go to **Authentication** → **Settings**
2. Configure SMTP settings for production (optional for development)
3. For production, consider using services like SendGrid, Mailgun, or AWS SES

## Deployment

### Option 1: Vercel (Recommended)

Vercel provides excellent React/Vite support with automatic deployments.

#### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/todo-app)

#### Manual Deployment
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - In Vercel dashboard, go to your project settings
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **Redeploy** after adding environment variables

### Option 2: Netlify

#### Quick Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/todo-app)

#### Manual Deployment
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

3. **Set Environment Variables**:
   - In Netlify dashboard, go to Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Redeploy** after adding environment variables

### Option 3: GitHub Pages

#### Setup
1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://your-username.github.io/todo-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Environment Variables**:
   Since GitHub Pages doesn't support server-side environment variables, you'll need to:
   - Create a production build with hardcoded values, OR
   - Use a different deployment platform

### Option 4: Railway

1. **Connect your GitHub repo** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** on git push

### Option 5: Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Build and Deploy
```bash
# Build Docker image
docker build -t todo-app .

# Run locally
docker run -p 3000:80 todo-app

# Deploy to your preferred container platform
# (AWS ECS, Google Cloud Run, DigitalOcean Apps, etc.)
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Database Schema

The app uses a simple but powerful database schema:

```sql
CREATE TABLE todos (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);
```

### Security Features
- **Row Level Security (RLS)**: Users can only access their own todos
- **Authentication Required**: Database operations require valid user session
- **Automatic Cleanup**: Todos are deleted when user account is deleted

## Usage

### For Authenticated Users
1. **Sign Up/Sign In**: Click "Sign In" to create an account or log in
2. **Add Todos**: Type your task and press Enter or click "Add Todo"
3. **Manage Todos**: Click, edit, or delete todos as needed
4. **Sync Across Devices**: Your todos automatically sync across all logged-in devices

### For Guest Users
1. **Offline Mode**: Use without signing up (data stored locally)
2. **Limited Features**: No cloud sync or cross-device access
3. **Easy Upgrade**: Sign up anytime to sync your existing todos

### Managing Todos
- **Complete**: Click the circle button to mark as complete
- **Edit**: Double-click on any todo text to edit inline
- **Delete**: Hover over a todo and click the trash icon
- **Filter**: Use filter buttons to view different todo states
- **Bulk Actions**: Clear all completed todos at once

## Technical Details

### Built With
- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Supabase**: Backend-as-a-Service with PostgreSQL database
- **CSS3**: Custom CSS with modern features
- **JavaScript ES6+**: Modern JavaScript features

### Architecture
- **Frontend**: Single Page Application (SPA) with React
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Authentication**: Supabase Auth with email/password
- **Database**: PostgreSQL with Row Level Security
- **Deployment**: Static site hosting (Vercel, Netlify, etc.)

### Key Components
- **App**: Main container with authentication and state management
- **AuthModal**: Sign up/sign in functionality
- **TodoForm**: Input form for adding new todos
- **TodoStats**: Statistics display
- **TodoFilters**: Filter controls
- **TodoList & TodoItem**: Todo display and management

### API Integration
- **Supabase Client**: Handles database operations and authentication
- **Real-time Subscriptions**: Automatic updates when data changes
- **Offline Support**: Graceful fallback to localStorage
- **Error Handling**: Comprehensive error handling with user feedback

## Customization

### Styling
- Edit `src/App.css` for visual customization
- CSS variables in `:root` for easy theme changes
- Responsive breakpoints for mobile optimization

### Features
- Add new todo properties (priority, due date, categories)
- Implement real-time collaboration
- Add file attachments or images
- Create todo templates or recurring tasks

### Database
- Extend the schema in Supabase SQL Editor
- Add new tables for categories, tags, or sharing
- Implement advanced querying and sorting

## Troubleshooting

### Common Issues

#### "Missing Supabase environment variables"
- Ensure `.env` file exists and contains correct values
- Restart development server after adding environment variables
- Check that variable names start with `VITE_`

#### "Failed to load data"
- Verify Supabase URL and keys are correct
- Check Supabase project is running (not paused)
- Ensure database schema is properly set up

#### Authentication not working
- Check email templates are configured in Supabase
- Verify RLS policies are set up correctly
- Ensure user registration is enabled in Supabase Auth settings

#### Todos not syncing
- Check browser network tab for API errors
- Verify user is properly authenticated
- Check RLS policies allow the current user to access data

### Getting Help
- Check the browser console for error messages
- Review Supabase logs in the dashboard
- Ensure all environment variables are set correctly

## Performance Optimization

### Production Optimizations
- **Code Splitting**: Vite automatically splits code for optimal loading
- **Asset Optimization**: Images and CSS are automatically optimized
- **Caching**: Proper cache headers for static assets
- **Database Indexes**: Optimized queries with proper indexing

### Best Practices
- **Debounced Updates**: Reduces API calls during rapid user input
- **Optimistic Updates**: UI updates immediately for better UX
- **Error Boundaries**: Graceful error handling
- **Accessibility**: Full keyboard navigation and screen reader support

## Security Considerations

### Data Protection
- **Row Level Security**: Database-level access control
- **Input Sanitization**: Protected against XSS attacks
- **HTTPS Only**: Secure data transmission
- **Environment Variables**: Sensitive data not exposed in client code

### Authentication Security
- **Secure Sessions**: JWT tokens with proper expiration
- **Password Requirements**: Enforced by Supabase Auth
- **Email Verification**: Optional but recommended
- **Rate Limiting**: Built-in protection against abuse

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Join our community discussions

---

**Happy Todo Managing!** 🎯✨
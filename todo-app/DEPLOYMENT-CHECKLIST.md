# Deployment Checklist

Use this checklist to ensure your todo app is properly deployed with Supabase backend.

## Pre-Deployment Setup

### ✅ Supabase Configuration
- [ ] Created Supabase project at [supabase.com](https://supabase.com)
- [ ] Ran the SQL schema from `supabase-schema.sql` in Supabase SQL Editor
- [ ] Verified the `todos` table was created successfully
- [ ] Confirmed Row Level Security (RLS) policies are active
- [ ] Obtained Project URL and Anon Key from Supabase dashboard

### ✅ Local Environment
- [ ] Created `.env` file from `.env.example`
- [ ] Added `VITE_SUPABASE_URL` to `.env`
- [ ] Added `VITE_SUPABASE_ANON_KEY` to `.env`
- [ ] Tested local development with `npm run dev`
- [ ] Verified authentication works (sign up/sign in)
- [ ] Confirmed todos sync to Supabase database

### ✅ Code Quality
- [ ] Ran `npm run lint` with no errors
- [ ] Ran `npm run build` successfully
- [ ] Tested production build with `npm run preview`
- [ ] Verified all features work in production build

## Deployment Options

Choose one of the following deployment platforms:

### Option A: Vercel (Recommended)

#### Quick Deploy
- [ ] Click the "Deploy with Vercel" button in README
- [ ] Connect your GitHub repository
- [ ] Add environment variables in Vercel dashboard:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] Deploy and test the live application

#### Manual Deploy
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Run `vercel` in project directory
- [ ] Add environment variables in Vercel dashboard
- [ ] Redeploy after adding environment variables

### Option B: Netlify

#### Quick Deploy
- [ ] Click the "Deploy to Netlify" button in README
- [ ] Connect your GitHub repository
- [ ] Add environment variables in Netlify Site Settings
- [ ] Deploy and test the live application

#### Manual Deploy
- [ ] Run `npm run build`
- [ ] Drag `dist` folder to [netlify.com/drop](https://netlify.com/drop)
- [ ] Add environment variables in Site Settings
- [ ] Redeploy after adding environment variables

### Option C: Other Platforms

#### Railway
- [ ] Connect GitHub repository to Railway
- [ ] Add environment variables in Railway dashboard
- [ ] Deploy automatically on git push

#### DigitalOcean App Platform
- [ ] Create new app from GitHub repository
- [ ] Configure environment variables
- [ ] Deploy and monitor build logs

## Post-Deployment Verification

### ✅ Functionality Testing
- [ ] Visit deployed application URL
- [ ] Test sign up with new email address
- [ ] Verify email confirmation (if configured)
- [ ] Test sign in with created account
- [ ] Add new todos and confirm they appear
- [ ] Test todo operations (complete, edit, delete)
- [ ] Test filtering (all, active, completed)
- [ ] Test bulk actions (clear completed)
- [ ] Test responsive design on mobile device

### ✅ Performance & Security
- [ ] Check page load speed (should be < 3 seconds)
- [ ] Verify HTTPS is enabled
- [ ] Test offline functionality (should fall back to localStorage)
- [ ] Confirm user data isolation (create second account and verify separation)
- [ ] Check browser console for errors
- [ ] Test cross-device synchronization

### ✅ Supabase Dashboard
- [ ] Verify todos appear in Supabase database
- [ ] Check authentication logs for successful sign-ins
- [ ] Monitor API usage and performance
- [ ] Review security policies are working correctly

## Production Configuration

### ✅ Supabase Production Settings
- [ ] Configure custom email templates (optional)
- [ ] Set up SMTP provider for production emails (recommended)
- [ ] Review and adjust rate limiting settings
- [ ] Set up monitoring and alerts
- [ ] Configure backup settings

### ✅ Domain & SSL (Optional)
- [ ] Configure custom domain
- [ ] Verify SSL certificate is valid
- [ ] Set up domain redirects if needed
- [ ] Update CORS settings in Supabase if using custom domain

## Troubleshooting

### Common Issues & Solutions

#### Environment Variables Not Working
- [ ] Ensure variables start with `VITE_` prefix
- [ ] Restart development server after changes
- [ ] Clear browser cache and hard refresh
- [ ] Check deployment platform environment variable settings

#### Authentication Issues
- [ ] Verify Supabase project is not paused
- [ ] Check email templates are configured
- [ ] Confirm RLS policies are set up correctly
- [ ] Test with different email addresses

#### Database Connection Issues
- [ ] Verify Supabase URL and keys are correct
- [ ] Check network connectivity
- [ ] Review Supabase logs for error details
- [ ] Ensure database schema is properly set up

#### Build/Deployment Failures
- [ ] Check build logs for specific error messages
- [ ] Verify all dependencies are properly installed
- [ ] Ensure environment variables are set correctly
- [ ] Test local build with `npm run build`

## Maintenance

### ✅ Regular Tasks
- [ ] Monitor application performance
- [ ] Review Supabase usage and costs
- [ ] Update dependencies regularly
- [ ] Monitor error logs and fix issues
- [ ] Backup important data periodically

### ✅ Security Updates
- [ ] Keep Supabase client library updated
- [ ] Review and update RLS policies as needed
- [ ] Monitor for security advisories
- [ ] Regularly rotate API keys if needed

## Success Criteria

Your deployment is successful when:
- ✅ Application loads without errors
- ✅ Users can sign up and sign in
- ✅ Todos are created, updated, and deleted successfully
- ✅ Data persists across browser sessions
- ✅ Application works on mobile devices
- ✅ Multiple users can use the app simultaneously
- ✅ Data is properly isolated between users

## Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review deployment platform documentation
3. Check Supabase documentation and community
4. Create an issue in the project repository

---

**Happy Deploying!** 🚀
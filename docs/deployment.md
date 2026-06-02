# Deployment Guide for Next.js with Supabase

## 🚀 Overview
This guide covers deploying a Next.js application with Supabase integration to production.

---

## 📦 Prerequisites
- A [Supabase](https://supabase.com/) account with a project created.
- A [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) account for frontend deployment (recommended).
- A [Railway](https://railway.app/) or [Render](https://render.com/) account for backend deployment (if applicable).

---

## 🔧 Deployment Steps

### 1. Deploying Next.js Frontend

#### Using Vercel (Recommended)
1. **Install Vercel CLI (Optional)**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard:**
   - Push your Next.js code to a GitHub/GitLab repository.
   - Go to [Vercel Dashboard](https://vercel.com/dashboard), import the repository, and deploy.

3. **Deploy via Command Line:**
   ```bash
   vercel --prod
   ```

#### Using Netlify
1. **Connect your GitHub/GitLab repository** to [Netlify](https://www.netlify.com/).
2. **Configure build settings** in Netlify:
   - **Build command:** `npm run build`
   - **Publish directory:** `out` (or `.next` for older Next.js versions)
3. **Deploy** your site.

---

### 2. Setting Up Supabase

#### Configure Environment Variables
1. Go to your Supabase project **Settings > API** and note the following:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (if needed for server-side operations)

2. Set these variables in your Vercel/Netlify project settings:
   - For **Vercel**: Go to **Project Settings > Environment Variables**.
   - For **Netlify**: Go to **Site Settings > Environment Variables**.

---

### 3. Deploying Database and Backend Functions (if applicable)

#### Using Supabase Database
1. **Enable Database Auto-refresh** (Optional):
   - Go to **Database > Settings > Auto-refresh** and enable it to keep your local database in sync with production.

2. **Set Up Edge Functions** (if needed):
   - Go to **Functions > Create Function** and write your serverless function.
   - Deploy the function and update your frontend to call the Edge Function.

---

### 4. Testing Deployment

1. **Test Frontend:**
   - Visit your deployed site and test all features.

2. **Test Backend and Database:**
   - Ensure Supabase database connections are working.
   - Test API endpoints and database queries.

---

## 🔒 Security Considerations

- **Never expose `SUPABASE_SERVICE_ROLE_KEY` in the client-side code.**
- Use environment variables for sensitive data.
- Enable Row Level Security (RLS) in Supabase.
- Use `.env.local` for local development and environment variables for production.

---

## 🔄 Post-Deployment Tasks

1. **Set up a custom domain** (if needed) in Vercel/Netlify.
2. **Configure analytics** using Vercel Analytics or Google Analytics.
3. **Set up monitoring** for errors and performance with Vercel Analytics or Sentry.

---

## 🛠 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Database connection errors** | Double-check your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in environment variables. |
| **Function deployment failures** | Ensure your Edge Function is correctly configured and dependencies are installed. |
| **Build failures in Vercel/Netlify** | Check build logs for errors and update dependencies. |
| **CORS issues** | Configure CORS in Supabase Dashboard under **Settings > CORS Configuration**. |

---

## 📌 Additional Resources
- [Vercel Next.js Deployment Guide](https://vercel.com/docs/concepts/deployments/next.js)
- [Supabase Deployment Guide](https://supabase.com/docs/guides/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🎉 Congratulations!
Your Next.js application with Supabase is now live! If you encounter any issues, refer to the troubleshooting section or reach out to the community forums.

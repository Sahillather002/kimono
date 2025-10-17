# Supabase Setup Guide for Kimono Anime App

## 📋 Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. Your Kimono project cloned and dependencies installed

## 🚀 Setup Steps

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: Kimono Anime
   - **Database Password**: (choose a strong password)
   - **Region**: (choose closest to your users)
4. Click "Create new project"
5. Wait for the project to be provisioned (~2 minutes)

### Step 2: Get Your API Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)

### Step 3: Configure Environment Variables

1. In your Kimono project root, create or update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
```

2. **Never commit these to Git!** (already in `.gitignore`)

### Step 4: Run Database Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Click "New Query"
3. Copy the entire content of `supabase-schema.sql` from your project
4. Paste it into the SQL editor
5. Click "Run" or press `Ctrl/Cmd + Enter`

You should see success messages for:
- ✅ Tables created (`user_anime_list`, `user_watch_history`)
- ✅ Indexes created
- ✅ RLS policies enabled
- ✅ Triggers created

### Step 5: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled (should be by default)
3. Optional: Configure email templates in **Email Templates**

### Step 6: Test the Connection

1. Restart your Next.js dev server:
```bash
npm run dev
```

2. Try signing up:
   - Go to http://localhost:3000/auth/signup
   - Create a test account
   - Check Supabase Dashboard → **Authentication** → **Users** to see your new user

3. Try adding an anime to your list:
   - Browse any anime detail page
   - Click "Add to List"
   - Check Supabase Dashboard → **Table Editor** → **user_anime_list** to see your data

## 📊 Database Structure

### `user_anime_list` Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| anime_id | TEXT | MyAnimeList anime ID |
| anime_title | TEXT | Anime title |
| anime_image | TEXT | Anime cover image URL |
| anime_type | TEXT | TV, Movie, OVA, etc. |
| status | TEXT | watching, completed, plan_to_watch, dropped, on_hold |
| rating | INTEGER | User rating (1-10) |
| episodes_watched | INTEGER | Episodes watched count |
| notes | TEXT | User notes |
| created_at | TIMESTAMP | When added to list |
| updated_at | TIMESTAMP | Last updated |

### `user_watch_history` Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| anime_id | TEXT | MyAnimeList anime ID |
| episode_id | TEXT | Episode identifier |
| watched_at | TIMESTAMP | When watched |
| progress | REAL | Watch progress in seconds |
| duration | REAL | Total episode duration |

## 🔒 Security (Row Level Security)

The database is secured with RLS policies:
- ✅ Users can only see their own data
- ✅ Users can only modify their own data
- ✅ No user can access another user's list or history
- ✅ All queries are automatically filtered by `user_id`

## 🧪 Testing Your Setup

Run this test in your browser console (after signing in):

```javascript
// Test adding to list
fetch('/api/my-list', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    anime_id: '1',
    anime_title: 'Test Anime',
    status: 'plan_to_watch'
  })
}).then(r => r.json()).then(console.log)

// Test fetching list
fetch('/api/my-list')
  .then(r => r.json())
  .then(console.log)
```

## 🆘 Troubleshooting

### "Unauthorized" errors
- Make sure you're signed in
- Check that your `.env.local` has correct credentials
- Restart your dev server after changing environment variables

### "Failed to add anime to list"
- Check Supabase Dashboard → **Database** → **Logs** for errors
- Verify the schema was applied correctly
- Check that RLS policies are enabled

### Users can't sign up
- Go to **Authentication** → **Settings**
- Ensure "Enable Email Confirmations" is OFF for development
- Check **URL Configuration** has correct site URL

## 📚 Next Steps

Now that Supabase is set up:

1. ✅ Users can sign up/sign in
2. ✅ Users can add anime to their list
3. ✅ Users can view their "My List" page
4. ✅ User data is private and secure

**Future Enhancements:**
- Add watch progress tracking
- Implement user ratings
- Add social features (friends, recommendations)
- Enable email notifications for new episodes

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

---

**Last Updated**: October 2025

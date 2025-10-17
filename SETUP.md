# AnimeStream Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager
- Supabase account (for authentication) - Optional but recommended

### Installation

1. **Clone the repository** (if you haven't already)
   ```bash
   cd kimono
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   # On Windows
   copy env.example.txt .env.local
   
   # On Mac/Linux
   cp env.example.txt .env.local
   ```

   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   > **Note**: The app will work without Supabase, but authentication features will be disabled.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Setup (Optional)

### Setting up Supabase

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be set up

2. **Get your credentials**
   - Go to Project Settings → API
   - Copy the `Project URL` and `anon public` key
   - Add them to your `.env.local` file

3. **Create the profiles table**
   
   Run this SQL in the Supabase SQL Editor:
   ```sql
   -- Create profiles table
   create table profiles (
     id uuid default uuid_generate_v4() primary key,
     user_id uuid references auth.users on delete cascade not null unique,
     username text unique not null,
     avatar_url text,
     favorite_anime text[] default '{}',
     watch_list text[] default '{}',
     watched_episodes jsonb default '{}',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Set up Row Level Security (RLS)
   alter table profiles enable row level security;

   -- Create policies
   create policy "Public profiles are viewable by everyone."
     on profiles for select
     using ( true );

   create policy "Users can insert their own profile."
     on profiles for insert
     with check ( auth.uid() = user_id );

   create policy "Users can update their own profile."
     on profiles for update
     using ( auth.uid() = user_id );
   ```

4. **Configure OAuth providers** (Optional)
   - Go to Authentication → Providers
   - Enable Google OAuth
   - Add your OAuth credentials

## 🧪 Testing the Scrapers

The project includes web scrapers for MyAnimeList. Test them with:

```bash
npx tsx src/lib/scrapers/test-scraper.ts
```

> **Important**: Web scrapers are fragile and may break if MyAnimeList changes their HTML structure. For production use, consider using official APIs like:
> - [Jikan API](https://jikan.moe/) (MyAnimeList API)
> - [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx tsx src/lib/scrapers/test-scraper.ts` - Test anime scrapers

## 🎯 Features

### Implemented ✅
- Browse anime catalog
- Search functionality
- Anime details pages
- User authentication (with Supabase)
- Protected routes (My List, Profile)
- Responsive design
- Dark/Light theme
- Real-time updates with Socket.IO

### Authentication Features (When Configured)
- Email/Password authentication
- Google OAuth
- Protected routes
- User profiles
- Favorites list
- Watchlist

## 🚨 Troubleshooting

### "Auth session missing" error
This is normal if you haven't configured Supabase. The app will work without authentication, but you won't be able to:
- Sign in/Sign up
- Access "My List" or "Profile" pages
- Save favorites or watchlist

**Solution**: Follow the [Authentication Setup](#-authentication-setup-optional) section above.

### Broken images
Make sure the image domains are configured in `next.config.ts`. The following domains are already configured:
- `cdn.myanimelist.net` - Anime images
- `*.supabase.co` - User avatars (if using Supabase storage)
- `avatars.githubusercontent.com` - GitHub avatars
- `lh3.googleusercontent.com` - Google profile pictures

### Port 3000 already in use
If port 3000 is occupied, you can change it:
```bash
# Windows
set PORT=3001 && npm run dev

# Mac/Linux
PORT=3001 npm run dev
```

### Scrapers not working
The web scrapers depend on MyAnimeList's HTML structure, which can change. If scrapers fail:
1. Check if MyAnimeList is accessible
2. Consider using mock data for development
3. Integrate with official APIs for production

## 📁 Project Structure

```
kimono/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── anime/          # Anime detail pages
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── my-list/        # User's anime list (protected)
│   │   ├── profile/        # User profile (protected)
│   │   └── search/         # Search page
│   ├── components/          # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── navbar.tsx      # Navigation bar
│   │   └── protected-route.tsx  # Route protection HOC
│   ├── contexts/            # React contexts
│   │   └── auth-context.tsx     # Authentication context
│   ├── lib/                 # Utilities and services
│   │   ├── scrapers/       # Web scrapers
│   │   ├── supabase.ts     # Supabase client & helpers
│   │   └── utils.ts        # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                  # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── package.json            # Dependencies
└── README.md              # Project documentation
```

## 🔒 Security Notes

- Never commit `.env` or `.env.local` files to version control
- Keep your Supabase keys secure
- Enable Row Level Security (RLS) in Supabase
- Use environment variables for all sensitive data

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy coding! 🎉**

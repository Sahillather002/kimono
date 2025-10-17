-- Supabase Database Schema for Kimono Anime App

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Anime List Table
CREATE TABLE IF NOT EXISTS user_anime_list (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anime_id TEXT NOT NULL,
  anime_title TEXT NOT NULL,
  anime_image TEXT,
  anime_type TEXT,
  status TEXT CHECK (status IN ('watching', 'completed', 'plan_to_watch', 'dropped', 'on_hold')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  episodes_watched INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, anime_id)
);

-- User Watch History Table
CREATE TABLE IF NOT EXISTS user_watch_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anime_id TEXT NOT NULL,
  episode_id TEXT NOT NULL,
  watched_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  progress REAL DEFAULT 0, -- Progress in seconds
  duration REAL, -- Total duration in seconds
  UNIQUE(user_id, anime_id, episode_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_anime_list_user_id ON user_anime_list(user_id);
CREATE INDEX IF NOT EXISTS idx_user_anime_list_status ON user_anime_list(status);
CREATE INDEX IF NOT EXISTS idx_user_watch_history_user_id ON user_watch_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_watch_history_anime_id ON user_watch_history(anime_id);

-- Row Level Security (RLS) Policies
ALTER TABLE user_anime_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watch_history ENABLE ROW LEVEL SECURITY;

-- Policies for user_anime_list
CREATE POLICY "Users can view their own list"
  ON user_anime_list FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own list"
  ON user_anime_list FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own list"
  ON user_anime_list FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own list"
  ON user_anime_list FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for user_watch_history
CREATE POLICY "Users can view their own history"
  ON user_watch_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own history"
  ON user_watch_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own history"
  ON user_watch_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own history"
  ON user_watch_history FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_anime_list
CREATE TRIGGER update_user_anime_list_updated_at 
  BEFORE UPDATE ON user_anime_list 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

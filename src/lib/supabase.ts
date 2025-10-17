import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Create a dummy client if not configured, or real client if configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

export interface User {
  id: string
  email: string
  username?: string
  avatar_url?: string
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  username: string
  avatar_url?: string
  favorite_anime: string[]
  watch_list: string[]
  watched_episodes: Record<string, number[]>
  created_at: string
  updated_at: string
}

// Authentication functions
export const auth = {
  async signUp(email: string, password: string, username: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.')
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    })

    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.')
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  async signInWithGoogle() {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.')
    }
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) throw error
    return data
  },

  async signOut() {
    if (!isSupabaseConfigured) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    if (!isSupabaseConfigured) return null
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      // Silently handle session missing errors
      if (error?.message?.includes('session') || error?.message?.includes('Auth')) {
        return null
      }
      if (error) throw error
      return user
    } catch (error) {
      console.warn('Error getting current user:', error)
      return null
    }
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    if (!isSupabaseConfigured) {
      // Return a dummy subscription
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
    return supabase.auth.onAuthStateChange(callback)
  }
}

// User profile functions
export const profile = {
  async createProfile(userId: string, username: string) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        user_id: userId,
        username,
        favorite_anime: [],
        watch_list: [],
        watched_episodes: {}
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async addToFavorites(userId: string, animeId: string) {
    const profile = await this.getProfile(userId)
    if (!profile) throw new Error('Profile not found')

    const favorites = [...(profile.favorite_anime || [])]
    if (!favorites.includes(animeId)) {
      favorites.push(animeId)
    }

    return this.updateProfile(userId, { favorite_anime: favorites })
  },

  async removeFromFavorites(userId: string, animeId: string) {
    const profile = await this.getProfile(userId)
    if (!profile) throw new Error('Profile not found')

    const favorites = (profile.favorite_anime || []).filter(id => id !== animeId)
    return this.updateProfile(userId, { favorite_anime: favorites })
  },

  async addToWatchList(userId: string, animeId: string) {
    const profile = await this.getProfile(userId)
    if (!profile) throw new Error('Profile not found')

    const watchList = [...(profile.watch_list || [])]
    if (!watchList.includes(animeId)) {
      watchList.push(animeId)
    }

    return this.updateProfile(userId, { watch_list: watchList })
  },

  async removeFromWatchList(userId: string, animeId: string) {
    const profile = await this.getProfile(userId)
    if (!profile) throw new Error('Profile not found')

    const watchList = (profile.watch_list || []).filter(id => id !== animeId)
    return this.updateProfile(userId, { watch_list: watchList })
  },

  async markEpisodeWatched(userId: string, animeId: string, episodeNumber: number) {
    const profile = await this.getProfile(userId)
    if (!profile) throw new Error('Profile not found')

    const watchedEpisodes = { ...(profile.watched_episodes || {}) }
    if (!watchedEpisodes[animeId]) {
      watchedEpisodes[animeId] = []
    }
    if (!watchedEpisodes[animeId].includes(episodeNumber)) {
      watchedEpisodes[animeId].push(episodeNumber)
    }

    return this.updateProfile(userId, { watched_episodes: watchedEpisodes })
  },

  async getFavorites(userId: string) {
    const profile = await this.getProfile(userId)
    return profile?.favorite_anime || []
  },

  async getWatchList(userId: string) {
    const profile = await this.getProfile(userId)
    return profile?.watch_list || []
  },

  async getWatchedEpisodes(userId: string, animeId: string) {
    const profile = await this.getProfile(userId)
    return profile?.watched_episodes?.[animeId] || []
  }
}
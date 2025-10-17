"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { auth, profile } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    const getInitialUser = async () => {
      try {
        const currentUser = await auth.getCurrentUser()
        setUser(currentUser)
      } catch (error: any) {
        // Silently handle auth session errors
        if (!error?.message?.includes('Supabase is not configured')) {
          console.warn('Auth not configured or session missing')
        }
      } finally {
        setLoading(false)
      }
    }

    getInitialUser()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        // Create profile if user just signed up
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const existingProfile = await profile.getProfile(session.user.id)
            if (!existingProfile) {
              await profile.createProfile(
                session.user.id,
                session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'User'
              )
            }
          } catch (error) {
            console.warn('Error creating profile:', error)
          }
        }
      }
    )

    return () => subscription?.unsubscribe?.()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await auth.signIn(email, password)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, username: string) => {
    setLoading(true)
    try {
      await auth.signUp(email, password, username)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      await auth.signInWithGoogle()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await auth.signOut()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
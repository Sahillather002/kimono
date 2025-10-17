import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'

export interface AnimeListItem {
  id: string
  user_id: string
  anime_id: string
  anime_title: string
  anime_image?: string
  anime_type?: string
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped' | 'on_hold'
  rating?: number
  episodes_watched: number
  notes?: string
  created_at: string
  updated_at: string
}

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) {
    throw new Error('No active session')
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`
  }
}

export function useAnimeList() {
  const { user } = useAuth()
  const [list, setList] = useState<AnimeListItem[]>([])
  const [loading, setLoading] = useState(false)

  const fetchList = async (status?: string) => {
    if (!user) return

    setLoading(true)
    try {
      const headers = await getAuthHeaders()
      const params = new URLSearchParams()
      if (status) params.set('status', status)

      const response = await fetch(`/api/my-list?${params.toString()}`, { headers })
      if (response.ok) {
        const data = await response.json()
        setList(data)
      }
    } catch (error) {
      console.error('Failed to fetch anime list:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToList = async (
    animeId: string,
    animeTitle: string,
    animeImage?: string,
    animeType?: string,
    status: string = 'plan_to_watch'
  ) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    try {
      const headers = await getAuthHeaders()
      const response = await fetch('/api/my-list', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          anime_id: animeId,
          anime_title: animeTitle,
          anime_image: animeImage,
          anime_type: animeType,
          status,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error('Failed to add anime to list')
      }

      const data = await response.json()
      setList((prev) => {
        const existing = prev.find((item) => item.anime_id === animeId)
        if (existing) {
          return prev.map((item) =>
            item.anime_id === animeId ? data : item
          )
        }
        return [data, ...prev]
      })

      return data
    } catch (error) {
      console.error('Failed to add anime to list:', error)
      throw error
    }
  }

  const removeFromList = async (animeId: string) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    try {
      const headers = await getAuthHeaders()
      const response = await fetch(`/api/my-list?anime_id=${animeId}`, {
        method: 'DELETE',
        headers,
      })

      if (!response.ok) {
        throw new Error('Failed to remove anime from list')
      }

      setList((prev) => prev.filter((item) => item.anime_id !== animeId))
    } catch (error) {
      console.error('Failed to remove anime from list:', error)
      throw error
    }
  }

  const isInList = (animeId: string) => {
    return list.some((item) => item.anime_id === animeId)
  }

  const getAnimeFromList = (animeId: string) => {
    return list.find((item) => item.anime_id === animeId)
  }

  useEffect(() => {
    if (user) {
      fetchList()
    } else {
      setList([])
    }
  }, [user])

  return {
    list,
    loading,
    fetchList,
    addToList,
    removeFromList,
    isInList,
    getAnimeFromList,
  }
}

/**
 * Jikan API Client
 * Official MyAnimeList API wrapper
 * Documentation: https://docs.api.jikan.moe/
 */

import axios, { AxiosInstance } from 'axios'
import { Anime, Episode, Character } from '@/types/anime'

export class JikanAPI {
  private static instance: AxiosInstance = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Rate limiting helper
  private static lastRequestTime = 0
  private static readonly MIN_REQUEST_INTERVAL = 350 // Jikan rate limit: ~3 requests per second

  private static async rateLimit() {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => 
        setTimeout(resolve, this.MIN_REQUEST_INTERVAL - timeSinceLastRequest)
      )
    }
    this.lastRequestTime = Date.now()
  }

  /**
   * Get the best available image URL
   */
  private static getImageUrl(images: any): string {
    // Try different image qualities in order of preference
    return images?.webp?.large_image_url || 
           images?.webp?.image_url || 
           images?.jpg?.large_image_url || 
           images?.jpg?.image_url || 
           ''
  }

  /**
   * Transform Jikan anime data to our Anime type
   */
  private static transformAnime(jikanAnime: any): Anime {
    const imageUrl = JikanAPI.getImageUrl(jikanAnime.images)
    
    return {
      id: jikanAnime.mal_id.toString(),
      title: {
        english: jikanAnime.title_english || jikanAnime.title || '',
        romaji: jikanAnime.title || '',
        native: jikanAnime.title_japanese || jikanAnime.title || '',
      },
      image: imageUrl,
      banner: imageUrl,
      type: jikanAnime.type || 'TV',
      rating: jikanAnime.rating || 'PG-13',
      year: jikanAnime.year || jikanAnime.aired?.prop?.from?.year || new Date().getFullYear(),
      status: JikanAPI.transformStatus(jikanAnime.status),
      description: jikanAnime.synopsis || '',
      genres: jikanAnime.genres?.map((g: any) => g.name) || [],
      totalEpisodes: jikanAnime.episodes || 0,
      studios: jikanAnime.studios?.map((s: any) => s.name) || [],
      source: jikanAnime.source || 'Unknown',
      duration: JikanAPI.parseDuration(jikanAnime.duration),
      averageScore: jikanAnime.score || 0,
      popularity: jikanAnime.popularity || 0,
    }
  }

  private static transformStatus(status: string): "ONGOING" | "FINISHED" | "UPCOMING" {
    const statusMap: { [key: string]: "ONGOING" | "FINISHED" | "UPCOMING" } = {
      'Currently Airing': 'ONGOING',
      'Finished Airing': 'FINISHED',
      'Not yet aired': 'UPCOMING',
    }
    return statusMap[status] || 'FINISHED'
  }

  private static parseDuration(duration: string): number {
    if (!duration) return 24
    const match = duration.match(/(\d+)\s*min/)
    return match ? parseInt(match[1]) : 24
  }

  /**
   * Get top/popular anime
   */
  static async getTopAnime(
    limit: number = 25, 
    page: number = 1,
    filter?: 'airing' | 'upcoming' | 'bypopularity' | 'favorite' | 'movie'
  ): Promise<Anime[]> {
    try {
      await this.rateLimit()
      const params: any = { limit, page }
      if (filter) {
        params.filter = filter
      }
      const response = await this.instance.get('/top/anime', { params })
      return response.data.data.map(this.transformAnime)
    } catch (error) {
      console.error('Error fetching top anime:', error)
      return []
    }
  }

  /**
   * Get seasonal anime (current season)
   */
  static async getSeasonalAnime(limit: number = 25): Promise<Anime[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get('/seasons/now', {
        params: { limit },
      })
      return response.data.data.map(this.transformAnime)
    } catch (error) {
      console.error('Error fetching seasonal anime:', error)
      return []
    }
  }

  /**
   * Search anime by query
   */
  static async searchAnime(
    query: string,
    limit: number = 25,
    page: number = 1,
    filters?: {
      type?: string
      status?: string
      rating?: string
      genres?: string
      order_by?: string
      sort?: 'asc' | 'desc'
    }
  ): Promise<Anime[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get('/anime', {
        params: {
          q: query,
          limit,
          page,
          ...filters,
        },
      })
      return response.data.data.map(this.transformAnime)
    } catch (error) {
      console.error('Error searching anime:', error)
      return []
    }
  }

  /**
   * Get anime by ID with full details
   */
  static async getAnimeById(id: string): Promise<Anime | null> {
    try {
      await this.rateLimit()
      const response = await this.instance.get(`/anime/${id}/full`)
      return this.transformAnime(response.data.data)
    } catch (error) {
      console.error(`Error fetching anime ${id}:`, error)
      return null
    }
  }

  /**
   * Get anime characters
   */
  static async getAnimeCharacters(animeId: string): Promise<Character[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get(`/anime/${animeId}/characters`)
      
      return response.data.data.slice(0, 20).map((item: any) => ({
        id: item.character.mal_id.toString(),
        name: {
          first: item.character.name.split(',')[0]?.trim() || '',
          last: item.character.name.split(',')[1]?.trim() || '',
          full: item.character.name,
          native: item.character.name,
        },
        image: JikanAPI.getImageUrl(item.character.images),
        description: '',
        role: item.role || 'Supporting',
        voiceActors: item.voice_actors?.map((va: any) => ({
          id: va.person.mal_id.toString(),
          name: va.person.name,
          image: JikanAPI.getImageUrl(va.person.images),
          language: va.language,
        })) || [],
      }))
    } catch (error) {
      console.error(`Error fetching characters for anime ${animeId}:`, error)
      return []
    }
  }

  /**
   * Get anime episodes
   */
  static async getAnimeEpisodes(animeId: string, page: number = 1): Promise<Episode[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get(`/anime/${animeId}/episodes`, {
        params: { page },
      })
      
      return response.data.data.map((ep: any) => ({
        id: `${animeId}-${ep.mal_id}`,
        title: ep.title || `Episode ${ep.mal_id}`,
        description: ep.synopsis || '',
        episodeNumber: ep.mal_id,
        duration: 24, // Default duration
        airDate: ep.aired || '',
        filler: ep.filler || false,
        recap: ep.recap || false,
      }))
    } catch (error) {
      console.error(`Error fetching episodes for anime ${animeId}:`, error)
      return []
    }
  }

  /**
   * Get anime recommendations
   */
  static async getAnimeRecommendations(animeId: string): Promise<Anime[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get(`/anime/${animeId}/recommendations`)
      
      return response.data.data.slice(0, 10).map((item: any) => 
        this.transformAnime(item.entry)
      )
    } catch (error) {
      console.error(`Error fetching recommendations for anime ${animeId}:`, error)
      return []
    }
  }

  /**
   * Get recently added anime
   */
  static async getRecentAnime(limit: number = 25): Promise<Anime[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get('/anime', {
        params: {
          order_by: 'start_date',
          sort: 'desc',
          limit,
        },
      })
      return response.data.data.map(this.transformAnime)
    } catch (error) {
      console.error('Error fetching recent anime:', error)
      return []
    }
  }

  /**
   * Get anime by genre
   */
  static async getAnimeByGenre(genreId: number, limit: number = 25, page: number = 1): Promise<Anime[]> {
    try {
      await this.rateLimit()
      const response = await this.instance.get('/anime', {
        params: {
          genres: genreId,
          limit,
          page,
        },
      })
      return response.data.data.map(this.transformAnime)
    } catch (error) {
      console.error(`Error fetching anime by genre ${genreId}:`, error)
      return []
    }
  }

  /**
   * Get random anime
   */
  static async getRandomAnime(): Promise<Anime | null> {
    try {
      await this.rateLimit()
      const response = await this.instance.get('/random/anime')
      return this.transformAnime(response.data.data)
    } catch (error) {
      console.error('Error fetching random anime:', error)
      return null
    }
  }
}

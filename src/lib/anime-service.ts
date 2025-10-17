import { Anime, Episode, Character, SearchResult, SearchFilters } from '@/types/anime'
import { AnimeScraper } from './scrapers/anime-scraper'

// Mock data fallback
import mockTrendingData from '@/data/mock-trending.json'
import mockPopularData from '@/data/mock-popular.json'
import mockRecentData from '@/data/mock-recent.json'

export class AnimeService {
  /**
   * Get trending anime with fallback to scraping
   */
  static async getTrendingAnime(): Promise<Anime[]> {
    try {
      // Try to scrape first
      const scrapedData = await AnimeScraper.scrapeTrendingAnime()
      if (scrapedData.length > 0) {
        return scrapedData
      }
    } catch (error) {
      console.warn('Scraping failed, using mock data:', error)
    }

    // Fallback to mock data
    return mockTrendingData || []
  }

  /**
   * Get popular anime
   */
  static async getPopularAnime(): Promise<Anime[]> {
    try {
      // For now, return mock data
      // In production, you could scrape from different sources
      return mockPopularData || []
    } catch (error) {
      console.error('Error getting popular anime:', error)
      return []
    }
  }

  /**
   * Get recent episodes
   */
  static async getRecentEpisodes(): Promise<Anime[]> {
    try {
      return mockRecentData || []
    } catch (error) {
      console.error('Error getting recent episodes:', error)
      return []
    }
  }

  /**
   * Search anime with scraping fallback
   */
  static async searchAnime(query: string, filters: SearchFilters = {}): Promise<SearchResult> {
    try {
      let results: Anime[] = []

      // Try scraping first
      if (query) {
        const scrapedResults = await AnimeScraper.searchAnime(query)
        results = scrapedResults
      }

      // Apply filters
      if (filters.type) {
        results = results.filter(anime => anime.type === filters.type)
      }
      if (filters.status) {
        results = results.filter(anime => anime.status === filters.status)
      }
      if (filters.rating) {
        results = results.filter(anime => anime.rating === filters.rating)
      }
      if (filters.genre) {
        results = results.filter(anime => 
          anime.genres.some(genre => genre.toLowerCase() === filters.genre.toLowerCase())
        )
      }
      if (filters.year) {
        results = results.filter(anime => anime.year === filters.year)
      }

      // Sort results
      if (filters.sort) {
        results.sort((a, b) => {
          let comparison = 0
          
          switch (filters.sort) {
            case "TITLE":
              comparison = a.title.english.localeCompare(b.title.english)
              break
            case "RATING":
              comparison = (a.averageScore || 0) - (b.averageScore || 0)
              break
            case "YEAR":
              comparison = a.year - b.year
              break
            case "POPULARITY":
              comparison = (a.popularity || 0) - (b.popularity || 0)
              break
            case "EPISODES":
              comparison = a.totalEpisodes - b.totalEpisodes
              break
          }
          
          return filters.order === "ASC" ? comparison : -comparison
        })
      }

      return {
        results,
        total: results.length,
        page: 1,
        perPage: 20,
        hasNextPage: false
      }
    } catch (error) {
      console.error('Error searching anime:', error)
      return {
        results: [],
        total: 0,
        page: 1,
        perPage: 20,
        hasNextPage: false
      }
    }
  }

  /**
   * Get anime details with scraping fallback
   */
  static async getAnimeDetails(animeId: string): Promise<Anime | null> {
    try {
      // Try scraping first
      const scrapedAnime = await AnimeScraper.scrapeAnimeDetails(animeId)
      if (scrapedAnime) {
        return scrapedAnime
      }
    } catch (error) {
      console.warn('Scraping failed for anime details:', error)
    }

    // Fallback to mock database (would be implemented in a real app)
    return null
  }

  /**
   * Get episodes for an anime
   */
  static async getEpisodes(animeId: string): Promise<Episode[]> {
    try {
      const episodes = await AnimeScraper.scrapeEpisodes(animeId)
      return episodes
    } catch (error) {
      console.error('Error getting episodes:', error)
      return []
    }
  }

  /**
   * Get characters for an anime
   */
  static async getCharacters(animeId: string): Promise<Character[]> {
    try {
      const characters = await AnimeScraper.scrapeCharacters(animeId)
      return characters
    } catch (error) {
      console.error('Error getting characters:', error)
      return []
    }
  }

  /**
   * Get video sources for an episode
   */
  static async getVideoSources(animeId: string, episodeId: string): Promise<any[]> {
    try {
      // This would integrate with actual video sources in production
      // For now, return mock video sources
      return [
        {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          quality: "720p",
          format: "mp4",
          size: 150000000
        }
      ]
    } catch (error) {
      console.error('Error getting video sources:', error)
      return []
    }
  }
}
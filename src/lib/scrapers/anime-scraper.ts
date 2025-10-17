import axios from 'axios'
import * as cheerio from 'cheerio'
import { Anime, Episode, Character } from '@/types/anime'

export class AnimeScraper {
  private static readonly BASE_URL = 'https://myanimelist.net'
  private static readonly USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

  /**
   * Scrape trending anime from MyAnimeList
   */
  static async scrapeTrendingAnime(): Promise<Anime[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/anime.php`, {
        headers: {
          'User-Agent': this.USER_AGENT
        },
        timeout: 10000
      })

      const $ = cheerio.load(response.data)
      const animeList: Anime[] = []

      $('.seasonal-anime').each((index, element) => {
        if (index >= 10) return false // Limit to 10 results

        const $anime = $(element)
        const titleElement = $anime.find('.title-text a')
        const imageElement = $anime.find('.image img')
        const infoElements = $anime.find('.info')
        
        const title = titleElement.text().trim()
        const image = imageElement.attr('src') || ''
        const url = titleElement.attr('href') || ''
        
        // Extract ID from URL
        const idMatch = url.match(/\/anime\/(\d+)/)
        const id = idMatch ? idMatch[1] : `scraped-${index}`

        // Extract additional info
        const genres: string[] = []
        $anime.find('.genres').find('a').each((_, genre) => {
          genres.push($(genre).text().trim())
        })

        const type = $anime.find('.source').text().trim() || 'TV'
        const episodesText = $anime.find('.eps').text().trim()
        const totalEpisodes = episodesText ? parseInt(episodesText) || 0 : 0

        animeList.push({
          id,
          title: {
            english: title,
            romaji: title,
            native: title
          },
          image,
          type: type as any,
          rating: "PG-13",
          year: new Date().getFullYear(),
          status: "ONGOING",
          description: `Scraped from MyAnimeList: ${title}`,
          genres: genres.length > 0 ? genres : ["Action", "Adventure"],
          totalEpisodes,
          studios: ["Unknown"],
          source: "Web",
          duration: 24,
          averageScore: 8.0,
          popularity: 100000
        })
      })

      return animeList
    } catch (error) {
      console.error('Error scraping trending anime:', error)
      return []
    }
  }

  /**
   * Scrape anime details by ID
   */
  static async scrapeAnimeDetails(animeId: string): Promise<Anime | null> {
    try {
      const response = await axios.get(`${this.BASE_URL}/anime/${animeId}`, {
        headers: {
          'User-Agent': this.USER_AGENT
        },
        timeout: 10000
      })

      const $ = cheerio.load(response.data)
      
      const title = $('h1.title-name').text().trim()
      const image = $('.leftside > div > img').attr('src') || ''
      const description = $('p[itemprop="description"]').text().trim()
      
      // Extract genres
      const genres: string[] = []
      $('span[itemprop="genre"]').each((_, genre) => {
        genres.push($(genre).text().trim())
      })

      // Extract additional information
      const type = $('span[itemprop="contentType"]').text().trim() || 'TV'
      const episodesText = $('span[itemprop="numberOfEpisodes"]').text().trim()
      const totalEpisodes = episodesText ? parseInt(episodesText) || 0 : 0
      
      const ratingText = $('.rating span').text().trim()
      const rating = ratingText || "PG-13"
      
      const yearText = $('.information-season').text().trim()
      const yearMatch = yearText.match(/(\d{4})/)
      const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()

      // Extract studios
      const studios: string[] = []
      $('span[itemprop="creator"]').each((_, studio) => {
        studios.push($(studio).text().trim())
      })

      return {
        id: animeId,
        title: {
          english: title,
          romaji: title,
          native: title
        },
        image,
        banner: image,
        type: type as any,
        rating,
        year,
        status: "FINISHED",
        description,
        genres: genres.length > 0 ? genres : ["Action"],
        totalEpisodes,
        studios: studios.length > 0 ? studios : ["Unknown"],
        source: "Web",
        duration: 24,
        averageScore: 8.0,
        popularity: 100000
      }
    } catch (error) {
      console.error(`Error scraping anime details for ID ${animeId}:`, error)
      return null
    }
  }

  /**
   * Search anime by query
   */
  static async searchAnime(query: string): Promise<Anime[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/anime.php`, {
        params: {
          q: query,
          cat: 'anime'
        },
        headers: {
          'User-Agent': this.USER_AGENT
        },
        timeout: 10000
      })

      const $ = cheerio.load(response.data)
      const animeList: Anime[] = []

      $('.list tr').each((index, element) => {
        if (index === 0) return true // Skip header
        if (index >= 20) return false // Limit results

        const $row = $(element)
        const titleElement = $row.find('td:nth-child(1) a')
        const imageElement = $row.find('td:nth-child(2) img')
        
        const title = titleElement.text().trim()
        const image = imageElement.attr('src') || ''
        const url = titleElement.attr('href') || ''
        
        // Extract ID from URL
        const idMatch = url.match(/\/anime\/(\d+)/)
        const id = idMatch ? idMatch[1] : `search-${index}`

        // Extract type and episodes
        const infoText = $row.find('td:nth-child(3)').text().trim()
        const typeMatch = infoText.match(/(TV|Movie|OVA|Special)/)
        const type = typeMatch ? typeMatch[1] : 'TV'
        
        const episodesMatch = infoText.match(/(\d+)\s*eps?/)
        const totalEpisodes = episodesMatch ? parseInt(episodesMatch[1]) : 0

        // Extract rating
        const ratingText = $row.find('td:nth-child(4)').text().trim()
        const rating = ratingText || "PG-13"

        animeList.push({
          id,
          title: {
            english: title,
            romaji: title,
            native: title
          },
          image,
          type: type as any,
          rating,
          year: new Date().getFullYear(),
          status: "FINISHED",
          description: `Search result for: ${title}`,
          genres: ["Action", "Adventure"],
          totalEpisodes,
          studios: ["Unknown"],
          source: "Web",
          duration: 24,
          averageScore: 8.0,
          popularity: 100000
        })
      })

      return animeList
    } catch (error) {
      console.error('Error searching anime:', error)
      return []
    }
  }

  /**
   * Scrape episodes for an anime (limited implementation)
   */
  static async scrapeEpisodes(animeId: string): Promise<Episode[]> {
    try {
      // Note: MyAnimeList doesn't provide detailed episode information
      // This is a placeholder implementation
      const anime = await this.scrapeAnimeDetails(animeId)
      if (!anime) return []

      const episodes: Episode[] = []
      for (let i = 1; i <= Math.min(anime.totalEpisodes, 5); i++) {
        episodes.push({
          id: `${animeId}-${i}`,
          title: `Episode ${i}`,
          description: `Episode ${i} of ${anime.title.english}`,
          episodeNumber: i,
          duration: anime.duration,
          airDate: new Date().toISOString().split('T')[0]
        })
      }

      return episodes
    } catch (error) {
      console.error('Error scraping episodes:', error)
      return []
    }
  }

  /**
   * Scrape characters for an anime
   */
  static async scrapeCharacters(animeId: string): Promise<Character[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/anime/${animeId}/characters`, {
        headers: {
          'User-Agent': this.USER_AGENT
        },
        timeout: 10000
      })

      const $ = cheerio.load(response.data)
      const characters: Character[] = []

      $('.character-list').each((index, element) => {
        if (index >= 10) return false // Limit to 10 characters

        const $char = $(element)
        const nameElement = $char.find('td:nth-child(2) a')
        const imageElement = $char.find('td:nth-child(1) img')
        
        const name = nameElement.text().trim()
        const image = imageElement.attr('src') || ''
        const url = nameElement.attr('href') || ''
        
        // Extract ID from URL
        const idMatch = url.match(/\/character\/(\d+)/)
        const id = idMatch ? idMatch[1] : `char-${animeId}-${index}`

        // Extract role
        const roleText = $char.find('td:nth-child(3)').text().trim()
        const role = roleText || "Supporting"

        characters.push({
          id,
          name: {
            first: name.split(' ')[0] || name,
            last: name.split(' ')[1] || '',
            full: name,
            native: name
          },
          image,
          description: `Character from anime`,
          role,
          voiceActors: []
        })
      })

      return characters
    } catch (error) {
      console.error('Error scraping characters:', error)
      return []
    }
  }
}
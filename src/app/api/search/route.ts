import { NextRequest, NextResponse } from 'next/server'
import { Anime, SearchResult, SearchFilters } from '@/types/anime'
import { JikanAPI } from '@/lib/jikan-api'

// Mock anime database (can be removed - kept for reference)
/*
const mockAnimeDatabase: Anime[] = [
  {
    id: "1",
    title: {
      english: "Attack on Titan Final Season",
      romaji: "Shingeki no Kyojin: The Final Season",
      native: "進撃の巨人 The Final Season"
    },
    image: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
    type: "TV",
    rating: "R-17",
    year: 2023,
    status: "FINISHED",
    description: "The war between Marley and Paradis now becomes a global conflict.",
    genres: ["Action", "Drama", "Fantasy", "Military"],
    totalEpisodes: 87,
    studios: ["MAPPA"],
    source: "Manga",
    duration: 24,
    averageScore: 9.0,
    popularity: 2500000
  },
  {
    id: "2",
    title: {
      english: "Demon Slayer: Kimetsu no Yaiba",
      romaji: "Kimetsu no Yaiba",
      native: "鬼滅の刃"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
    type: "TV",
    rating: "R-17",
    year: 2019,
    status: "FINISHED",
    description: "Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.",
    genres: ["Action", "Historical", "Shounen", "Supernatural"],
    totalEpisodes: 26,
    studios: ["Ufotable"],
    source: "Manga",
    duration: 24,
    averageScore: 8.7,
    popularity: 2100000
  },
  {
    id: "3",
    title: {
      english: "Death Note",
      romaji: "Death Note",
      native: "デスノート"
    },
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    type: "TV",
    rating: "R-17",
    year: 2006,
    status: "FINISHED",
    description: "A brilliant student discovers a supernatural notebook that can kill anyone whose name is written in it.",
    genres: ["Psychological", "Thriller", "Mystery", "Police", "Supernatural"],
    totalEpisodes: 37,
    studios: ["Madhouse"],
    source: "Manga",
    duration: 23,
    averageScore: 9.0,
    popularity: 2800000
  },
  {
    id: "4",
    title: {
      english: "Steins;Gate",
      romaji: "Steins;Gate",
      native: "シュタインズ・ゲート"
    },
    image: "https://cdn.myanimelist.net/images/anime/5/78745.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2011,
    status: "FINISHED",
    description: "A self-proclaimed mad scientist discovers time travel through a modified microwave.",
    genres: ["Sci-Fi", "Psychological", "Thriller", "Drama"],
    totalEpisodes: 24,
    studios: ["White Fox"],
    source: "Visual Novel",
    duration: 24,
    averageScore: 8.8,
    popularity: 2400000
  },
  {
    id: "5",
    title: {
      english: "One Piece",
      romaji: "One Piece",
      native: "ワンピース"
    },
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    type: "TV",
    rating: "PG-13",
    year: 1999,
    status: "ONGOING",
    description: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line.",
    genres: ["Action", "Adventure", "Comedy", "Drama"],
    totalEpisodes: 1089,
    studios: ["Toei Animation"],
    source: "Manga",
    duration: 24,
    averageScore: 8.8,
    popularity: 3200000
  },
  {
    id: "6",
    title: {
      english: "Naruto: Shippuden",
      romaji: "Naruto: Shippuden",
      native: "NARUTO疾風伝"
    },
    image: "https://cdn.myanimelist.net/images/anime/13/17407.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2007,
    status: "FINISHED",
    description: "Naruto Uzumaki wants to be the best ninja in the land.",
    genres: ["Action", "Adventure", "Martial Arts", "Shounen", "Super Power"],
    totalEpisodes: 500,
    studios: ["Studio Pierrot"],
    source: "Manga",
    duration: 23,
    averageScore: 8.2,
    popularity: 3000000
  },
  {
    id: "7",
    title: {
      english: "My Hero Academia",
      romaji: "Boku no Hero Academia",
      native: "僕のヒーローアカデミア"
    },
    image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2016,
    status: "ONGOING",
    description: "The appearance of 'quirks', newly discovered super powers, has been steadily increasing over the years.",
    genres: ["Action", "School", "Shounen", "Super Power"],
    totalEpisodes: 138,
    studios: ["Bones"],
    source: "Manga",
    duration: 24,
    averageScore: 8.5,
    popularity: 2200000
  },
  {
    id: "8",
    title: {
      english: "Tokyo Ghoul",
      romaji: "Tokyo Ghoul",
      native: "東京喰種トーキョーグール"
    },
    image: "https://cdn.myanimelist.net/images/anime/13/54809.jpg",
    type: "TV",
    rating: "R-17",
    year: 2014,
    status: "FINISHED",
    description: "The suspense horror/dark fantasy story is set in Tokyo, which is haunted by mysterious 'ghouls'.",
    genres: ["Action", "Mystery", "Horror", "Psychological", "Supernatural", "Drama"],
    totalEpisodes: 12,
    studios: ["Studio Pierrot"],
    source: "Manga",
    duration: 24,
    averageScore: 7.8,
    popularity: 2300000
  },
  {
    id: "9",
    title: {
      english: "Fullmetal Alchemist: Brotherhood",
      romaji: "Fullmetal Alchemist: Brotherhood",
      native: "鋼の錬金術師 FULLMETAL ALCHEMIST"
    },
    image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
    type: "TV",
    rating: "R-17",
    year: 2009,
    status: "FINISHED",
    description: "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality.",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    totalEpisodes: 64,
    studios: ["Bones"],
    source: "Manga",
    duration: 24,
    averageScore: 9.1,
    popularity: 2600000
  },
  {
    id: "10",
    title: {
      english: "Jujutsu Kaisen",
      romaji: "Jujutsu Kaisen",
      native: "呪術廻戦"
    },
    image: "https://cdn.myanimelist.net/images/anime/1739/136696.jpg",
    type: "TV",
    rating: "R-17",
    year: 2020,
    status: "FINISHED",
    description: "A boy named Itadori Yuji eats a cursed talisman and becomes possessed by a powerful curse.",
    genres: ["Action", "School", "Shounen", "Supernatural"],
    totalEpisodes: 24,
    studios: ["MAPPA"],
    source: "Manga",
    duration: 24,
    averageScore: 8.5,
    popularity: 1900000
  }
]

function filterAnime(anime: Anime[], query: string, filters: SearchFilters): Anime[] {
  let filtered = [...anime]

  // Text search
  if (query) {
    const searchTerm = query.toLowerCase()
    filtered = filtered.filter(anime => 
      anime.title.english.toLowerCase().includes(searchTerm) ||
      anime.title.romaji?.toLowerCase().includes(searchTerm) ||
      anime.title.native?.toLowerCase().includes(searchTerm) ||
      anime.description.toLowerCase().includes(searchTerm) ||
      anime.genres.some(genre => genre.toLowerCase().includes(searchTerm))
    )
  }

  // Type filter
  if (filters.type) {
    filtered = filtered.filter(anime => anime.type === filters.type)
  }

  // Status filter
  if (filters.status) {
    filtered = filtered.filter(anime => anime.status === filters.status)
  }

  // Rating filter
  if (filters.rating) {
    filtered = filtered.filter(anime => anime.rating === filters.rating)
  }

  // Genre filter
  if (filters.genre) {
    filtered = filtered.filter(anime => 
      anime.genres.some(genre => genre.toLowerCase() === filters.genre.toLowerCase())
    )
  }

  // Year filter
  if (filters.year) {
    filtered = filtered.filter(anime => anime.year === filters.year)
  }

  // Sort
  if (filters.sort) {
    filtered.sort((a, b) => {
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

  return filtered
}
*/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '25')
    
    // Map filters to Jikan format
    const jikanFilters = {
      type: searchParams.get('type') || undefined,
      status: searchParams.get('status') || undefined,
      rating: searchParams.get('rating') || undefined,
      genres: searchParams.get('genre') || undefined,
      order_by: searchParams.get('sort')?.toLowerCase() || undefined,
      sort: searchParams.get('order')?.toLowerCase() as 'asc' | 'desc' | undefined,
    }

    // Search using Jikan API
    const results = await JikanAPI.searchAnime(query, perPage, page, jikanFilters)

    const searchResult: SearchResult = {
      results,
      total: results.length * page, // Approximate total
      page,
      perPage,
      hasNextPage: results.length === perPage
    }

    return NextResponse.json(searchResult)
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search anime' },
      { status: 500 }
    )
  }
}
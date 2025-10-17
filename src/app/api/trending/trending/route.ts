import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(request: NextRequest) {
  try {
    // Get seasonal anime (currently airing - trending)
    const trendingAnime = await JikanAPI.getSeasonalAnime(25)
    
    return NextResponse.json(trendingAnime)
  } catch (error) {
    console.error('Trending API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending anime' },
      { status: 500 }
    )
  }
}

// Old mock data kept for reference - can be removed
/*
const mockTrendingAnime: Anime[] = [
  {
    id: "1",
    title: {
      english: "Attack on Titan Final Season",
      romaji: "Shingeki no Kyojin: The Final Season",
      native: "進撃の巨人 The Final Season"
    },
    image: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
    type: "TV",
    rating: "R-17",
    year: 2023,
    status: "FINISHED",
    description: "The war between Marley and Paradis now becomes a global conflict. As the battle rages on, Eren Jäger continues his rampage to end the world while his friends try to save him from himself.",
    genres: ["Action", "Drama", "Fantasy", "Military"],
    totalEpisodes: 87,
    currentEpisode: 87,
    season: "Winter 2023",
    studios: ["MAPPA", "Wit Studio"],
    source: "Manga",
    duration: 24,
    averageScore: 9.0,
    popularity: 2500000,
    favorites: 180000
  },
  {
    id: "2",
    title: {
      english: "Demon Slayer: Kimetsu no Yaiba - Swordsmith Village Arc",
      romaji: "Kimetsu no Yaiba: Katanakaji no Sato-hen",
      native: "鬼滅の刃 刀鍛冶の里編"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
    type: "TV",
    rating: "R-17",
    year: 2023,
    status: "FINISHED",
    description: "The Swordsmith Village arc continues Tanjiro's journey as he encounters the Love Hashira and the Mist Hashira, while facing the powerful Upper Rank demons Hantengu and Gyokko.",
    genres: ["Action", "Historical", "Shounen", "Supernatural"],
    totalEpisodes: 11,
    currentEpisode: 11,
    season: "Spring 2023",
    studios: ["Ufotable"],
    source: "Manga",
    duration: 24,
    averageScore: 8.7,
    popularity: 2100000,
    favorites: 150000
  },
  {
    id: "3",
    title: {
      english: "Jujutsu Kaisen Season 2",
      romaji: "Jujutsu Kaisen 2nd Season",
      native: "呪術廻戦 第2期"
    },
    image: "https://cdn.myanimelist.net/images/anime/1739/136696.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1739/136696.jpg",
    type: "TV",
    rating: "R-17",
    year: 2023,
    status: "FINISHED",
    description: "Gojo and Geto's past is revealed as we explore their friendship and eventual fallout. Meanwhile, in the present, the Culling Game arc begins with new challenges for Yuji and his friends.",
    genres: ["Action", "School", "Shounen", "Supernatural"],
    totalEpisodes: 23,
    currentEpisode: 23,
    season: "Summer 2023",
    studios: ["MAPPA"],
    source: "Manga",
    duration: 24,
    averageScore: 8.5,
    popularity: 1900000,
    favorites: 120000
  },
  {
    id: "4",
    title: {
      english: "One Piece",
      romaji: "One Piece",
      native: "ワンピース"
    },
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    type: "TV",
    rating: "PG-13",
    year: 1999,
    status: "ONGOING",
    description: "Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world.",
    genres: ["Action", "Adventure", "Comedy", "Drama"],
    totalEpisodes: 1089,
    currentEpisode: 1089,
    season: "Ongoing",
    studios: ["Toei Animation"],
    source: "Manga",
    duration: 24,
    averageScore: 8.8,
    popularity: 3200000,
    favorites: 280000
  },
  {
    id: "5",
    title: {
      english: "Spy x Family Season 2",
      romaji: "Spy x Family 2nd Season",
      native: "SPY×FAMILY 第2期"
    },
    image: "https://cdn.myanimelist.net/images/anime/1396/134698.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1396/134698.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2023,
    status: "FINISHED",
    description: "The Forger family continues their hilarious adventures as Loid tries to maintain his cover as a spy, Yoru hides her identity as an assassin, and Anya navigates school with her telepathic abilities.",
    genres: ["Action", "Comedy", "Shounen"],
    totalEpisodes: 12,
    currentEpisode: 12,
    season: "Fall 2023",
    studios: ["Wit Studio", "CloverWorks"],
    source: "Manga",
    duration: 24,
    averageScore: 8.4,
    popularity: 1600000,
    favorites: 95000
  }
]
*/
import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Get anime details from Jikan API
    const anime = await JikanAPI.getAnimeById(id)
    
    if (!anime) {
      return NextResponse.json(
        { error: 'Anime not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(anime)
  } catch (error) {
    console.error('Anime detail API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch anime details' },
      { status: 500 }
    )
  }
}

// Old mock database - can be removed
/*
const mockAnimeDatabase: Record<string, Anime> = {
  "1": {
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
    description: "The war between Marley and Paradis now becomes a global conflict. As the battle rages on, Eren Jäger continues his rampage to end the world while his friends try to save him from himself. The final battle for humanity's survival reaches its climax as long-hidden truths about the world, titans, and the power of the Founding Titan are finally revealed.",
    genres: ["Action", "Drama", "Fantasy", "Military"],
    totalEpisodes: 87,
    currentEpisode: 87,
    season: "Winter 2023",
    studios: ["MAPPA", "Wit Studio"],
    source: "Manga",
    duration: 24,
    averageScore: 9.0,
    popularity: 2500000,
    favorites: 180000,
    relations: [
      {
        id: "12",
        title: {
          english: "Attack on Titan",
          romaji: "Shingeki no Kyojin",
          native: "進撃の巨人"
        },
        image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        type: "TV",
        rating: "R-17",
        year: 2013,
        status: "FINISHED",
        description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans.",
        genres: ["Action", "Military", "Mystery", "Super Power", "Drama", "Fantasy"],
        totalEpisodes: 25
      }
    ]
  },
  "2": {
    id: "2",
    title: {
      english: "Demon Slayer: Kimetsu no Yaiba",
      romaji: "Kimetsu no Yaiba",
      native: "鬼滅の刃"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
    type: "TV",
    rating: "R-17",
    year: 2019,
    status: "FINISHED",
    description: "Tanjiro sets out to become a demon slayer to avenge his family and cure his sister. After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado begins his journey as a demon slayer to find a cure for his sister and bring justice to those who wronged his family.",
    genres: ["Action", "Historical", "Shounen", "Supernatural"],
    totalEpisodes: 26,
    season: "Spring 2019",
    studios: ["Ufotable"],
    source: "Manga",
    duration: 24,
    averageScore: 8.7,
    popularity: 2100000,
    favorites: 150000
  },
  "3": {
    id: "3",
    title: {
      english: "Death Note",
      romaji: "Death Note",
      native: "デスノート"
    },
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    type: "TV",
    rating: "R-17",
    year: 2006,
    status: "FINISHED",
    description: "A brilliant student discovers a supernatural notebook that can kill anyone whose name is written in it. Light Yagami is a brilliant but bored high school student who discovers the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and Light has vowed to use the power of the Death Note to rid the world of evil.",
    genres: ["Psychological", "Thriller", "Mystery", "Police", "Supernatural"],
    totalEpisodes: 37,
    studios: ["Madhouse"],
    source: "Manga",
    duration: 23,
    averageScore: 9.0,
    popularity: 2800000,
    favorites: 220000
  }
}
*/
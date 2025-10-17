import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(request: NextRequest) {
  try {
    // Get recently aired anime
    const recentAnime = await JikanAPI.getRecentAnime(25)
    
    return NextResponse.json(recentAnime)
  } catch (error) {
    console.error('Recent API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent anime' },
      { status: 500 }
    )
  }
}

// Old mock data kept for reference - can be removed
/*
const mockRecentAnime: Anime[] = [
  {
    id: "16",
    title: {
      english: "Frieren: Beyond Journey's End",
      romaji: "Sousou no Frieren",
      native: "葬送のフリーレン"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2023,
    status: "FINISHED",
    description: "After the party of heroes defeated the Demon King, they restored peace to the land and returned to lives of solitude.",
    genres: ["Adventure", "Drama", "Fantasy"],
    totalEpisodes: 28,
    currentEpisode: 28,
    season: "Fall 2023",
    studios: ["Madhouse"],
    source: "Manga",
    duration: 24,
    averageScore: 9.1,
    popularity: 800000,
    favorites: 60000
  },
  {
    id: "17",
    title: {
      english: "The Apothecary Diaries",
      romaji: "Kusuriya no Hitorigoto",
      native: "薬屋のひとりごと"
    },
    image: "https://cdn.myanimelist.net/images/anime/1790/139999.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1790/139999.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2023,
    status: "FINISHED",
    description: "In the imperial court, a young woman named Maomao is kidnapped and sold to the inner palace. She keeps her head down, does her job, and tries to avoid any trouble.",
    genres: ["Mystery", "Historical", "Drama"],
    totalEpisodes: 24,
    currentEpisode: 24,
    season: "Fall 2023",
    studios: ["TOHO animation", "OLM"],
    source: "Light Novel",
    duration: 24,
    averageScore: 8.6,
    popularity: 600000,
    favorites: 45000
  },
  {
    id: "18",
    title: {
      english: "Undead Unluck",
      romaji: "Undead Unluck",
      native: "アンデッドアンラック"
    },
    image: "https://cdn.myanimelist.net/images/anime/1545/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1545/138885.jpg",
    type: "TV",
    rating: "R-17",
    year: 2023,
    status: "FINISHED",
    description: "What happens when you encounter an unlucky person who brings misfortune to anyone they touch? And what if that person is immortal?",
    genres: ["Action", "Comedy", "Shounen", "Super Power"],
    totalEpisodes: 24,
    currentEpisode: 24,
    season: "Fall 2023",
    studios: ["David Production"],
    source: "Manga",
    duration: 24,
    averageScore: 7.8,
    popularity: 400000,
    favorites: 25000
  },
  {
    id: "19",
    title: {
      english: "Dr. Stone: New World Part 2",
      romaji: "Dr. Stone: New World Part 2",
      native: "ドクターストーン NEW WORLD 第2部"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2023,
    status: "FINISHED",
    description: "With the Stone Wars over, the former members of the Empire of Might join forces with the Kingdom of Science to build a ship.",
    genres: ["Adventure", "Sci-Fi", "Shounen"],
    totalEpisodes: 11,
    currentEpisode: 11,
    season: "Fall 2023",
    studios: ["TMS Entertainment"],
    source: "Manga",
    duration: 24,
    averageScore: 8.4,
    popularity: 500000,
    favorites: 35000
  },
  {
    id: "20",
    title: {
      english: "Mashle: Magic and Muscles Season 2",
      romaji: "Mashle: Magic and Muscles Season 2",
      native: "マッシュル-MASHLE- 第2期"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2024,
    status: "ONGOING",
    description: "Mash Burnedead is a young man born without magic in a world where magic is everything. He must compete in the Divine Visionary Selection to protect his peaceful life.",
    genres: ["Action", "Comedy", "School", "Shounen"],
    totalEpisodes: 12,
    currentEpisode: 8,
    season: "Winter 2024",
    studios: ["A-1 Pictures"],
    source: "Manga",
    duration: 24,
    averageScore: 7.9,
    popularity: 450000,
    favorites: 30000
  },
  {
    id: "21",
    title: {
      english: "Solo Leveling",
      romaji: "Ore dake Level Up na Ken",
      native: "나 혼자만 레벨업"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "R-17",
    year: 2024,
    status: "ONGOING",
    description: "In a world where hunters with superpowers battle deadly monsters, the weakest hunter Sung Jinwoo gains a unique power that allows him to level up.",
    genres: ["Action", "Adventure", "Fantasy"],
    totalEpisodes: 12,
    currentEpisode: 7,
    season: "Winter 2024",
    studios: ["A-1 Pictures"],
    source: "Web Novel",
    duration: 24,
    averageScore: 8.3,
    popularity: 1200000,
    favorites: 80000
  },
  {
    id: "22",
    title: {
      english: "Chainsaw Man",
      romaji: "Chainsaw Man",
      native: "チェンソーマン"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "R-17",
    year: 2022,
    status: "FINISHED",
    description: "Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life.",
    genres: ["Action", "Supernatural", "Shounen"],
    totalEpisodes: 12,
    studios: ["MAPPA"],
    source: "Manga",
    duration: 24,
    averageScore: 8.5,
    popularity: 1800000,
    favorites: 120000
  },
  {
    id: "23",
    title: {
      english: "Blue Lock",
      romaji: "Blue Lock",
      native: "ブルーロック"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2022,
    status: "FINISHED",
    description: "After a disastrous defeat at the 2018 World Cup, Japan's team struggles to regroup. But what's missing? An absolute Ace Striker.",
    genres: ["Sports", "Shounen"],
    totalEpisodes: 24,
    studios: ["8bit"],
    source: "Manga",
    duration: 24,
    averageScore: 8.1,
    popularity: 900000,
    favorites: 55000
  },
  {
    id: "24",
    title: {
      english: "Spy Classroom",
      romaji: "Spy Room",
      native: "スパイ教室"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2023,
    status: "FINISHED",
    description: "A world where spies operate in the shadows. Klaus, a legendary spy, has been assigned a mission that seems impossible: to train a group of talented but troublesome girls.",
    genres: ["Action", "Sci-Fi", "Mystery"],
    totalEpisodes: 12,
    studios: ["PA Works"],
    source: "Light Novel",
    duration: 24,
    averageScore: 7.6,
    popularity: 350000,
    favorites: 20000
  },
  {
    id: "25",
    title: {
      english: "The Eminence in Shadow Season 2",
      romaji: "Kage no Jitsuryokusha ni Naritakute! 2nd Season",
      native: "陰の実力者になりたくて！ 第2期"
    },
    image: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1765/138885.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2023,
    status: "FINISHED",
    description: "Cid Kagenou's dream is to become the ultimate 'Eminence in Shadow,' a mastermind who pulls the strings from the shadows. After reincarnating in another world, he finally gets his chance.",
    genres: ["Action", "Comedy", "Fantasy"],
    totalEpisodes: 12,
    studios: ["Nexus"],
    source: "Light Novel",
    duration: 24,
    averageScore: 8.0,
    popularity: 600000,
    favorites: 40000
  }
]
*/
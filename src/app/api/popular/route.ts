import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(request: NextRequest) {
  try {
    // Get top/popular anime
    const popularAnime = await JikanAPI.getTopAnime(25, 1)
    
    return NextResponse.json(popularAnime)
  } catch (error) {
    console.error('Popular API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch popular anime' },
      { status: 500 }
    )
  }
}

// Old mock data kept for reference - can be removed
/*
const mockPopularAnime: Anime[] = [
  {
    id: "6",
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
    description: "A shinigami, as a god of death, can kill any person—provided they see their victim's face and write their victim's name in a notebook called a Death Note.",
    genres: ["Psychological", "Thriller", "Mystery", "Police", "Supernatural"],
    totalEpisodes: 37,
    studios: ["Madhouse"],
    source: "Manga",
    duration: 23,
    averageScore: 9.0,
    popularity: 2800000,
    favorites: 220000
  },
  {
    id: "7",
    title: {
      english: "Steins;Gate",
      romaji: "Steins;Gate",
      native: "シュタインズ・ゲート"
    },
    image: "https://cdn.myanimelist.net/images/anime/5/78745.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/5/78745.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2011,
    status: "FINISHED",
    description: "The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective 'future gadgets' with fellow lab members.",
    genres: ["Sci-Fi", "Psychological", "Thriller", "Drama"],
    totalEpisodes: 24,
    studios: ["White Fox"],
    source: "Visual Novel",
    duration: 24,
    averageScore: 8.8,
    popularity: 2400000,
    favorites: 180000
  },
  {
    id: "8",
    title: {
      english: "Fullmetal Alchemist: Brotherhood",
      romaji: "Fullmetal Alchemist: Brotherhood",
      native: "鋼の錬金術師 FULLMETAL ALCHEMIST"
    },
    image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
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
    popularity: 2600000,
    favorites: 200000
  },
  {
    id: "9",
    title: {
      english: "Naruto: Shippuden",
      romaji: "Naruto: Shippuden",
      native: "NARUTO疾風伝"
    },
    image: "https://cdn.myanimelist.net/images/anime/13/17407.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/13/17407.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2007,
    status: "FINISHED",
    description: "Naruto Uzumaki wants to be the best ninja in the land. He's done well so far, but with the looming danger posed by the mysterious Akatsuki organization, Naruto knows he must train harder than ever.",
    genres: ["Action", "Adventure", "Martial Arts", "Shounen", "Super Power"],
    totalEpisodes: 500,
    studios: ["Studio Pierrot"],
    source: "Manga",
    duration: 23,
    averageScore: 8.2,
    popularity: 3000000,
    favorites: 160000
  },
  {
    id: "10",
    title: {
      english: "My Hero Academia",
      romaji: "Boku no Hero Academia",
      native: "僕のヒーローアカデミア"
    },
    image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2016,
    status: "ONGOING",
    description: "The appearance of 'quirks', newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting.",
    genres: ["Action", "School", "Shounen", "Super Power"],
    totalEpisodes: 138,
    currentEpisode: 138,
    studios: ["Bones"],
    source: "Manga",
    duration: 24,
    averageScore: 8.5,
    popularity: 2200000,
    favorites: 140000
  },
  {
    id: "11",
    title: {
      english: "Tokyo Ghoul",
      romaji: "Tokyo Ghoul",
      native: "東京喰種トーキョーグール"
    },
    image: "https://cdn.myanimelist.net/images/anime/13/54809.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/13/54809.jpg",
    type: "TV",
    rating: "R-17",
    year: 2014,
    status: "FINISHED",
    description: "The suspense horror/dark fantasy story is set in Tokyo, which is haunted by mysterious 'ghouls' who are devouring humans.",
    genres: ["Action", "Mystery", "Horror", "Psychological", "Supernatural", "Drama"],
    totalEpisodes: 12,
    studios: ["Studio Pierrot"],
    source: "Manga",
    duration: 24,
    averageScore: 7.8,
    popularity: 2300000,
    favorites: 130000
  },
  {
    id: "12",
    title: {
      english: "Attack on Titan",
      romaji: "Shingeki no Kyojin",
      native: "進撃の巨人"
    },
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    type: "TV",
    rating: "R-17",
    year: 2013,
    status: "FINISHED",
    description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls.",
    genres: ["Action", "Military", "Mystery", "Super Power", "Drama", "Fantasy"],
    totalEpisodes: 25,
    studios: ["Wit Studio", "MAPPA"],
    source: "Manga",
    duration: 24,
    averageScore: 9.0,
    popularity: 2500000,
    favorites: 180000
  },
  {
    id: "13",
    title: {
      english: "Dragon Ball Z",
      romaji: "Dragon Ball Z",
      native: "ドラゴンボールZ"
    },
    image: "https://cdn.myanimelist.net/images/anime/13/73579.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/13/73579.jpg",
    type: "TV",
    rating: "PG-13",
    year: 1989,
    status: "FINISHED",
    description: "Five years after winning the World Martial Arts tournament, Gokuu is now living a peaceful life with his wife and son.",
    genres: ["Action", "Adventure", "Comedy", "Super Power", "Martial Arts", "Fantasy", "Sci-Fi"],
    totalEpisodes: 291,
    studios: ["Toei Animation"],
    source: "Manga",
    duration: 24,
    averageScore: 8.2,
    popularity: 2700000,
    favorites: 150000
  },
  {
    id: "14",
    title: {
      english: "Hunter x Hunter (2011)",
      romaji: "Hunter x Hunter (2011)",
      native: "HUNTER×HUNTER"
    },
    image: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2011,
    status: "FINISHED",
    description: "Hunter x Hunter is set in a world where Hunters exist to perform all manner of dangerous tasks like capturing criminals and bravely searching for lost treasures in uncharted territories.",
    genres: ["Action", "Adventure", "Shounen", "Super Power", "Fantasy"],
    totalEpisodes: 148,
    studios: ["Madhouse"],
    source: "Manga",
    duration: 24,
    averageScore: 9.0,
    popularity: 2100000,
    favorites: 160000
  },
  {
    id: "15",
    title: {
      english: "One Punch Man",
      romaji: "One Punch Man",
      native: "ワンパンマン"
    },
    image: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
    banner: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
    type: "TV",
    rating: "PG-13",
    year: 2015,
    status: "FINISHED",
    description: "The seemingly ordinary and unimpressive Saitama has a rather unique hobby: being a hero. In order to pursue his childhood dream, he trained relentlessly for three years—and lost all of his hair in the process.",
    genres: ["Action", "Sci-Fi", "Comedy", "Parody", "Super Power", "Superhero"],
    totalEpisodes: 12,
    studios: ["Madhouse"],
    source: "Web Manga",
    duration: 24,
    averageScore: 8.6,
    popularity: 1900000,
    favorites: 120000
  }
]
*/
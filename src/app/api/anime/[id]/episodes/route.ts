import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    
    // Get episodes from Jikan API
    const episodes = await JikanAPI.getAnimeEpisodes(id, page)
    
    return NextResponse.json(episodes)
  } catch (error) {
    console.error('Episodes API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    )
  }
}

// Old mock database - can be removed
/*
const mockEpisodesDatabase: Record<string, Episode[]> = {
  "1": [
    {
      id: "1-1",
      title: "From You, 2,000 Years Ago",
      description: "The war between Marley and Paradis begins. Eren reveals his true intentions to his former friends.",
      episodeNumber: 1,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
      duration: 24,
      airDate: "2023-01-09"
    },
    {
      id: "1-2",
      title: "Midnight Train",
      description: "The Survey Corps prepares for their mission while memories of the past resurface.",
      episodeNumber: 2,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
      duration: 24,
      airDate: "2023-01-16"
    },
    {
      id: "1-3",
      title: "The Two of Them, Till the Dawn",
      description: "Historia and her father's past is revealed as political tensions rise.",
      episodeNumber: 3,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
      duration: 24,
      airDate: "2023-01-23"
    },
    {
      id: "1-4",
      title: "From One Hand to Another",
      description: "Eren and Zeke's connection is explored as the truth about the Founding Titan emerges.",
      episodeNumber: 4,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
      duration: 24,
      airDate: "2023-01-30"
    },
    {
      id: "1-5",
      title: "Declaration of War",
      description: "The long-awaited declaration of war is made as all sides prepare for the final battle.",
      episodeNumber: 5,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1545/114096.jpg",
      duration: 24,
      airDate: "2023-02-06"
    }
  ],
  "2": [
    {
      id: "2-1",
      title: "Cruelty",
      description: "Tanjiro begins his journey to become a demon slayer after his family is attacked.",
      episodeNumber: 1,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
      duration: 24,
      airDate: "2019-04-06"
    },
    {
      id: "2-2",
      title: "Trainer Sakonji Urokodaki",
      description: "Tanjiro meets his master and begins his training to become a demon slayer.",
      episodeNumber: 2,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
      duration: 24,
      airDate: "2019-04-13"
    },
    {
      id: "2-3",
      title: "Sabito and Makomo",
      description: "Tanjiro learns about the Final Selection and the tragic story of Sabito and Makomo.",
      episodeNumber: 3,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
      duration: 24,
      airDate: "2019-04-20"
    },
    {
      id: "2-4",
      title: "Final Selection",
      description: "Tanjiro participates in the Final Selection to become an official demon slayer.",
      episodeNumber: 4,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
      duration: 24,
      airDate: "2019-04-27"
    },
    {
      id: "2-5",
      title: "My Own Steel",
      description: "Tanjiro receives his nichirin blade and learns about the different breathing styles.",
      episodeNumber: 5,
      thumbnail: "https://cdn.myanimelist.net/images/anime/1765/134229.jpg",
      duration: 24,
      airDate: "2019-05-04"
    }
  ],
  "3": [
    {
      id: "3-1",
      title: "Rebirth",
      description: "Light Yagami discovers the Death Note and decides to use it to create a perfect world.",
      episodeNumber: 1,
      thumbnail: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      duration: 23,
      airDate: "2006-10-04"
    },
    {
      id: "3-2",
      title: "Confrontation",
      description: "Light meets L for the first time as the investigation into Kira begins.",
      episodeNumber: 2,
      thumbnail: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      duration: 23,
      airDate: "2006-10-11"
    },
    {
      id: "3-3",
      title: "Dealings",
      description: "Light and L engage in a psychological battle as the investigation intensifies.",
      episodeNumber: 3,
      thumbnail: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      duration: 23,
      airDate: "2006-10-18"
    },
    {
      id: "3-4",
      title: " Pursuit",
      description: "The task force closes in on Light as he tries to cover his tracks.",
      episodeNumber: 4,
      thumbnail: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      duration: 23,
      airDate: "2006-10-25"
    },
    {
      id: "3-5",
      title: "Tapestry",
      description: "Light's plans become more complex as he faces new challenges.",
      episodeNumber: 5,
      thumbnail: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
      duration: 23,
      airDate: "2006-11-01"
    }
  ]
}
*/
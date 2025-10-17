import { NextRequest, NextResponse } from 'next/server'
import { VideoSource } from '@/types/anime'

// Mock video sources database
const mockVideoSourcesDatabase: Record<string, VideoSource[]> = {
  "1-1": [
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: "1080p",
      format: "mp4",
      size: 250000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: "720p",
      format: "mp4",
      size: 150000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: "480p",
      format: "mp4",
      size: 80000000
    }
  ],
  "1-2": [
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      quality: "1080p",
      format: "mp4",
      size: 280000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      quality: "720p",
      format: "mp4",
      size: 170000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      quality: "480p",
      format: "mp4",
      size: 90000000
    }
  ],
  "2-1": [
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      quality: "1080p",
      format: "mp4",
      size: 220000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      quality: "720p",
      format: "mp4",
      size: 130000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      quality: "480p",
      format: "mp4",
      size: 70000000
    }
  ],
  "3-1": [
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      quality: "1080p",
      format: "mp4",
      size: 200000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      quality: "720p",
      format: "mp4",
      size: 120000000
    },
    {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      quality: "480p",
      format: "mp4",
      size: 65000000
    }
  ]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; episodeId: string } }
) {
  try {
    const { id, episodeId } = params
    
    // Create a unique key for the episode
    const episodeKey = `${id}-${episodeId}`
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const videoSources = mockVideoSourcesDatabase[episodeKey] || [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        quality: "720p",
        format: "mp4",
        size: 100000000
      }
    ]
    
    return NextResponse.json(videoSources)
  } catch (error) {
    console.error('Watch API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video sources' },
      { status: 500 }
    )
  }
}
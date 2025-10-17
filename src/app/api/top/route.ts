import { NextRequest, NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const limit = parseInt(searchParams.get('limit') || '25')
    
    let anime
    
    switch (type) {
      case 'airing':
        anime = await JikanAPI.getTopAnime(limit, 1, 'airing')
        break
      case 'upcoming':
        anime = await JikanAPI.getTopAnime(limit, 1, 'upcoming')
        break
      case 'movie':
        anime = await JikanAPI.getTopAnime(limit, 1, 'movie')
        break
      case 'all':
      default:
        anime = await JikanAPI.getTopAnime(limit)
        break
    }
    
    return NextResponse.json(anime)
  } catch (error) {
    console.error('Top anime API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch top anime' },
      { status: 500 }
    )
  }
}

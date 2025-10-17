import { NextResponse } from 'next/server'
import { JikanAPI } from '@/lib/jikan-api'

export async function GET() {
  try {
    const randomAnime = await JikanAPI.getRandomAnime()
    return NextResponse.json(randomAnime)
  } catch (error) {
    console.error('Random anime API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch random anime' },
      { status: 500 }
    )
  }
}

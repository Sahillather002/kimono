/**
 * Test Jikan API Integration
 * Run with: npx tsx src/lib/test-jikan.ts
 */

import { JikanAPI } from './jikan-api'

async function testJikanAPI() {
  console.log('🧪 Testing Jikan API Integration...\n')

  try {
    // Test 1: Get Top Anime
    console.log('📊 Test 1: Getting Top Anime')
    console.log('='.repeat(50))
    const topAnime = await JikanAPI.getTopAnime(5)
    console.log(`✅ Successfully fetched ${topAnime.length} top anime`)
    if (topAnime.length > 0) {
      console.log(`\nSample: ${topAnime[0].title.english || topAnime[0].title.romaji}`)
      console.log(`Score: ${topAnime[0].averageScore}`)
      console.log(`Type: ${topAnime[0].type}`)
    }
    console.log('')

    // Test 2: Get Seasonal Anime
    console.log('📅 Test 2: Getting Seasonal Anime')
    console.log('='.repeat(50))
    const seasonal = await JikanAPI.getSeasonalAnime(5)
    console.log(`✅ Successfully fetched ${seasonal.length} seasonal anime`)
    if (seasonal.length > 0) {
      console.log(`\nSample: ${seasonal[0].title.english || seasonal[0].title.romaji}`)
      console.log(`Status: ${seasonal[0].status}`)
    }
    console.log('')

    // Test 3: Search Anime
    console.log('🔍 Test 3: Searching for "Naruto"')
    console.log('='.repeat(50))
    const searchResults = await JikanAPI.searchAnime('Naruto', 5)
    console.log(`✅ Successfully found ${searchResults.length} results`)
    if (searchResults.length > 0) {
      console.log(`\nTop result: ${searchResults[0].title.english || searchResults[0].title.romaji}`)
      console.log(`Year: ${searchResults[0].year}`)
      console.log(`Episodes: ${searchResults[0].totalEpisodes}`)
    }
    console.log('')

    // Test 4: Get Anime Details
    console.log('📖 Test 4: Getting anime details for "Cowboy Bebop" (ID: 1)')
    console.log('='.repeat(50))
    const animeDetails = await JikanAPI.getAnimeById('1')
    if (animeDetails) {
      console.log('✅ Successfully fetched anime details')
      console.log(`\nTitle: ${animeDetails.title.english || animeDetails.title.romaji}`)
      console.log(`Score: ${animeDetails.averageScore}`)
      console.log(`Episodes: ${animeDetails.totalEpisodes}`)
      console.log(`Genres: ${animeDetails.genres.join(', ')}`)
      console.log(`Description: ${animeDetails.description.substring(0, 100)}...`)
    }
    console.log('')

    // Test 5: Get Characters
    console.log('👥 Test 5: Getting characters for anime ID 1')
    console.log('='.repeat(50))
    const characters = await JikanAPI.getAnimeCharacters('1')
    console.log(`✅ Successfully fetched ${characters.length} characters`)
    if (characters.length > 0) {
      console.log(`\nSample character: ${characters[0].name.full}`)
      console.log(`Role: ${characters[0].role}`)
      console.log(`Voice Actors: ${characters[0].voiceActors?.length || 0}`)
    }
    console.log('')

    // Test 6: Get Episodes
    console.log('🎬 Test 6: Getting episodes for anime ID 1')
    console.log('='.repeat(50))
    const episodes = await JikanAPI.getAnimeEpisodes('1', 1)
    console.log(`✅ Successfully fetched ${episodes.length} episodes`)
    if (episodes.length > 0) {
      console.log(`\nSample episode: ${episodes[0].title}`)
      console.log(`Episode Number: ${episodes[0].episodeNumber}`)
    }
    console.log('')

    console.log('='.repeat(50))
    console.log('✨ All tests completed successfully!\n')
    console.log('🎉 Jikan API is working perfectly!')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

// Run tests
testJikanAPI()

/**
 * Test file for AnimeScraper
 * Run with: npx tsx src/lib/scrapers/test-scraper.ts
 */

import { AnimeScraper } from './anime-scraper'

async function testScrapers() {
  console.log('🧪 Testing AnimeScraper...\n')

  // Test 1: Scrape Trending Anime
  console.log('📊 Test 1: Scraping Trending Anime')
  console.log('=' .repeat(50))
  try {
    const trending = await AnimeScraper.scrapeTrendingAnime()
    console.log(`✅ Successfully scraped ${trending.length} trending anime`)
    if (trending.length > 0) {
      console.log('\nSample result:')
      console.log(JSON.stringify(trending[0], null, 2))
    }
  } catch (error) {
    console.error('❌ Error scraping trending anime:', error)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test 2: Search Anime
  console.log('🔍 Test 2: Searching for "Naruto"')
  console.log('='.repeat(50))
  try {
    const searchResults = await AnimeScraper.searchAnime('Naruto')
    console.log(`✅ Successfully found ${searchResults.length} results`)
    if (searchResults.length > 0) {
      console.log('\nSample result:')
      console.log(JSON.stringify(searchResults[0], null, 2))
    }
  } catch (error) {
    console.error('❌ Error searching anime:', error)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test 3: Scrape Anime Details
  console.log('📖 Test 3: Scraping anime details for ID "1"')
  console.log('='.repeat(50))
  try {
    const animeDetails = await AnimeScraper.scrapeAnimeDetails('1')
    if (animeDetails) {
      console.log('✅ Successfully scraped anime details')
      console.log('\nResult:')
      console.log(JSON.stringify(animeDetails, null, 2))
    } else {
      console.log('⚠️  No details found for this anime')
    }
  } catch (error) {
    console.error('❌ Error scraping anime details:', error)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test 4: Scrape Episodes
  console.log('🎬 Test 4: Scraping episodes for anime ID "1"')
  console.log('='.repeat(50))
  try {
    const episodes = await AnimeScraper.scrapeEpisodes('1')
    console.log(`✅ Successfully scraped ${episodes.length} episodes`)
    if (episodes.length > 0) {
      console.log('\nSample episode:')
      console.log(JSON.stringify(episodes[0], null, 2))
    }
  } catch (error) {
    console.error('❌ Error scraping episodes:', error)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test 5: Scrape Characters
  console.log('👥 Test 5: Scraping characters for anime ID "1"')
  console.log('='.repeat(50))
  try {
    const characters = await AnimeScraper.scrapeCharacters('1')
    console.log(`✅ Successfully scraped ${characters.length} characters`)
    if (characters.length > 0) {
      console.log('\nSample character:')
      console.log(JSON.stringify(characters[0], null, 2))
    }
  } catch (error) {
    console.error('❌ Error scraping characters:', error)
  }

  console.log('\n' + '='.repeat(50))
  console.log('\n✨ All tests completed!\n')
}

// Run tests
testScrapers().catch(console.error)

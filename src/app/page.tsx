"use client"

import { useState, useEffect } from "react"
import { HeroCarousel } from "@/components/hero-carousel"
import { AnimeSection } from "@/components/anime-section"
import { Skeleton } from "@/components/ui/skeleton"
import { Anime } from "@/types/anime"

export default function Home() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([])
  const [popularAnime, setPopularAnime] = useState<Anime[]>([])
  const [recentEpisodes, setRecentEpisodes] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, popularRes, recentRes] = await Promise.all([
          fetch("/api/trending/trending"),
          fetch("/api/popular"),
          fetch("/api/recent")
        ])

        const trendingData = await trendingRes.json()
        const popularData = await popularRes.json()
        const recentData = await recentRes.json()

        setTrendingAnime(trendingData.slice(0, 5) || [])
        setPopularAnime(popularData.slice(0, 10) || [])
        setRecentEpisodes(recentData.slice(0, 10) || [])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Hero Skeleton */}
        <div className="w-full h-[70vh] max-h-[600px] bg-muted">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Section Skeletons */}
        <div className="container mx-auto px-4 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-none w-[200px] space-y-2">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Carousel */}
      {trendingAnime.length > 0 && (
        <HeroCarousel anime={trendingAnime} />
      )}

      {/* Content Sections */}
      <div className="container mx-auto px-4 space-y-8">
        {/* Popular Anime */}
        <AnimeSection
          title="Popular Anime"
          anime={popularAnime}
          viewAllHref="/search?sort=POPULARITY"
        />

        {/* Recent Episodes */}
        <AnimeSection
          title="Recent Episodes"
          anime={recentEpisodes}
          viewAllHref="/search?sort=YEAR"
          showEpisodes={true}
        />

        {/* Continue Watching (placeholder for future implementation) */}
        {/* <AnimeSection
          title="Continue Watching"
          anime={continueWatching}
          showEpisodes={true}
        /> */}
      </div>
    </div>
  )
}
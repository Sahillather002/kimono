"use client"

import { useState, useEffect } from "react"
import { Calendar, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimeCard } from "@/components/anime-card"
import { Anime } from "@/types/anime"

export default function SeasonalPage() {
  const [seasonalAnime, setSeasonalAnime] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSeason, setCurrentSeason] = useState({ season: '', year: 0 })

  useEffect(() => {
    const fetchSeasonal = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/trending/trending')
        const data = await response.json()
        setSeasonalAnime(data)
        
        // Determine current season
        const month = new Date().getMonth()
        const year = new Date().getFullYear()
        const season = month < 3 ? 'Winter' : month < 6 ? 'Spring' : month < 9 ? 'Summer' : 'Fall'
        setCurrentSeason({ season, year })
      } catch (error) {
        console.error('Failed to fetch seasonal anime:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSeasonal()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {currentSeason.season} {currentSeason.year}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover this season's hottest anime releases on Kimono
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-muted-foreground">
              {seasonalAnime.length} anime airing this season
            </span>
          </div>
        </div>

        {/* Seasonal Anime Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(20)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[2/3] w-full" />
                <CardContent className="p-3">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {seasonalAnime.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  Featured This Season
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seasonalAnime.slice(0, 3).map((anime) => (
                    <Card key={anime.id} className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                      <AnimeCard anime={anime} />
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Seasonal Anime */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Airing Anime</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {seasonalAnime.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            </div>

            {seasonalAnime.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No seasonal anime found</h3>
                  <p className="text-muted-foreground">
                    Check back later for updates
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

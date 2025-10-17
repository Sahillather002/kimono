"use client"

import { useState, useEffect } from "react"
import { Dices, RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import Image from "next/image"
import { Anime } from "@/types/anime"

export default function DiscoverPage() {
  const [randomAnime, setRandomAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(false)
  const [discoveries, setDiscoveries] = useState<Anime[]>([])

  const fetchRandomAnime = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/random')
      const data = await response.json()
      setRandomAnime(data)
      
      // Add to discoveries if not already there
      setDiscoveries(prev => {
        const exists = prev.some(anime => anime.id === data.id)
        if (!exists && prev.length < 10) {
          return [data, ...prev]
        }
        return prev
      })
    } catch (error) {
      console.error('Failed to fetch random anime:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomAnime()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-4">
            <Dices className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Random Discover
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let fate decide your next anime adventure on Kimono
          </p>
        </div>

        {/* Random Anime Card */}
        <div className="max-w-4xl mx-auto mb-12">
          {loading && !randomAnime ? (
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            </Card>
          ) : randomAnime ? (
            <Card className="overflow-hidden hover:shadow-2xl transition-all">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Anime Poster */}
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  {randomAnime.image ? (
                    <Image
                      src={randomAnime.image}
                      alt={randomAnime.title.english || randomAnime.title.romaji || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-600 text-white">
                      Random Pick
                    </Badge>
                  </div>
                </div>

                {/* Anime Info */}
                <div className="flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">
                      {randomAnime.title.english || randomAnime.title.romaji}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-6">
                      {randomAnime.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Score:</span>
                        <Badge variant="secondary" className="gap-1">
                          ⭐ {randomAnime.averageScore?.toFixed(1) || 'N/A'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Type:</span>
                        <Badge variant="outline">{randomAnime.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">Episodes:</span>
                        <Badge variant="outline">{randomAnime.totalEpisodes || '?'}</Badge>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold">Genres:</span>
                        {randomAnime.genres?.slice(0, 4).map(genre => (
                          <Badge key={genre} variant="secondary">{genre}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/anime/${randomAnime.id}`} className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={fetchRandomAnime}
                      disabled={loading}
                      className="gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      New
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : null}

          {/* Discover Button */}
          <div className="text-center mt-6">
            <Button
              size="lg"
              onClick={fetchRandomAnime}
              disabled={loading}
              className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Dices className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Discover New Anime
            </Button>
          </div>
        </div>

        {/* Discovery History */}
        {discoveries.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Discoveries</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {discoveries.map((anime) => (
                <Link key={anime.id} href={`/anime/${anime.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all group">
                    <div className="relative aspect-[2/3]">
                      {anime.image ? (
                        <Image
                          src={anime.image}
                          alt={anime.title.english || anime.title.romaji || ''}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {anime.title.english || anime.title.romaji}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

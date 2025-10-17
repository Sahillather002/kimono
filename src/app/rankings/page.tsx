"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy, TrendingUp, Star, Award, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Anime } from "@/types/anime"

export default function RankingsPage() {
  const [topAnime, setTopAnime] = useState<Anime[]>([])
  const [topAiring, setTopAiring] = useState<Anime[]>([])
  const [topUpcoming, setTopUpcoming] = useState<Anime[]>([])
  const [topMovies, setTopMovies] = useState<Anime[]>([])
  const [topPopular, setTopPopular] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true)
      try {
        const [allTime, airing, upcoming, movies, popular] = await Promise.all([
          fetch('/api/top?type=all').then(r => r.json()),
          fetch('/api/top?type=airing').then(r => r.json()),
          fetch('/api/top?type=upcoming').then(r => r.json()),
          fetch('/api/top?type=movie').then(r => r.json()),
          fetch('/api/popular').then(r => r.json())
        ])

        setTopAnime(allTime)
        setTopAiring(airing)
        setTopUpcoming(upcoming)
        setTopMovies(movies)
        setTopPopular(popular)
      } catch (error) {
        console.error('Failed to fetch rankings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRankings()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Top Rankings
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the highest-rated anime across different categories on Kimono
          </p>
        </div>

        {/* Rankings Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 h-16 gap-2">
            <TabsTrigger value="all" className="flex-col gap-2 px-3 py-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium">All Time</span>
            </TabsTrigger>
            <TabsTrigger value="airing" className="flex-col gap-2 px-3 py-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Airing</span>
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex-col gap-2 px-3 py-2">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="movies" className="flex-col gap-2 px-3 py-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Movies</span>
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex-col gap-2 px-3 py-2">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">Popular</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <RankingList anime={topAnime} loading={loading} title="Top Anime of All Time" />
          </TabsContent>

          <TabsContent value="airing" className="mt-8">
            <RankingList anime={topAiring} loading={loading} title="Top Airing Anime" />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-8">
            <RankingList anime={topUpcoming} loading={loading} title="Most Anticipated Upcoming" />
          </TabsContent>

          <TabsContent value="movies" className="mt-8">
            <RankingList anime={topMovies} loading={loading} title="Top Anime Movies" />
          </TabsContent>

          <TabsContent value="popular" className="mt-8">
            <RankingList anime={topPopular} loading={loading} title="Most Popular Anime" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function RankingList({ anime, loading, title }: { anime: Anime[]; loading: boolean; title: string }) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex gap-4">
              <Skeleton className="w-16 h-24 rounded flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="space-y-4">
        {anime.map((item, index) => (
          <Link key={item.id} href={`/anime/${item.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all group border-l-4"
              style={{ borderLeftColor: index < 3 ? ['#FFD700', '#C0C0C0', '#CD7F32'][index] : 'transparent' }}>
              <CardContent className="p-4 flex gap-6">
                {/* Rank Badge */}
                <div className="flex-shrink-0 flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                    'bg-muted text-foreground'
                  }`}>
                    #{index + 1}
                  </div>
                </div>

                {/* Anime Poster */}
                <div className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title.english || item.title.romaji || ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>

                {/* Anime Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {item.title.english || item.title.romaji}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {item.averageScore?.toFixed(2) || 'N/A'}
                    </Badge>
                    <Badge variant="outline">{item.type}</Badge>
                    <Badge variant="outline">{item.year}</Badge>
                    {item.totalEpisodes > 0 && (
                      <Badge variant="outline">{item.totalEpisodes} Episodes</Badge>
                    )}
                    <div className="flex gap-1 ml-auto">
                      {item.genres?.slice(0, 3).map(genre => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

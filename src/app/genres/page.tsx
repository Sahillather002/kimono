"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Sparkles } from "lucide-react"
import Link from "next/link"

const GENRES = [
  { name: "Action", id: 1, color: "from-red-500 to-orange-500", emoji: "⚔️" },
  { name: "Adventure", id: 2, color: "from-green-500 to-emerald-500", emoji: "🗺️" },
  { name: "Comedy", id: 4, color: "from-yellow-500 to-amber-500", emoji: "😂" },
  { name: "Drama", id: 8, color: "from-purple-500 to-pink-500", emoji: "🎭" },
  { name: "Fantasy", id: 10, color: "from-violet-500 to-purple-500", emoji: "🧙" },
  { name: "Horror", id: 14, color: "from-gray-800 to-gray-600", emoji: "👻" },
  { name: "Mystery", id: 7, color: "from-indigo-500 to-blue-500", emoji: "🔍" },
  { name: "Romance", id: 22, color: "from-pink-500 to-rose-500", emoji: "💕" },
  { name: "Sci-Fi", id: 24, color: "from-cyan-500 to-blue-500", emoji: "🚀" },
  { name: "Slice of Life", id: 36, color: "from-green-400 to-teal-400", emoji: "🌸" },
  { name: "Sports", id: 30, color: "from-orange-500 to-red-500", emoji: "⚽" },
  { name: "Supernatural", id: 37, color: "from-purple-600 to-indigo-600", emoji: "✨" },
  { name: "Thriller", id: 41, color: "from-red-600 to-gray-700", emoji: "😱" },
  { name: "Mecha", id: 18, color: "from-gray-500 to-slate-600", emoji: "🤖" },
  { name: "Music", id: 19, color: "from-blue-400 to-purple-400", emoji: "🎵" },
  { name: "Psychological", id: 40, color: "from-indigo-600 to-gray-700", emoji: "🧠" },
  { name: "School", id: 23, color: "from-blue-500 to-cyan-500", emoji: "🏫" },
  { name: "Military", id: 38, color: "from-green-700 to-gray-700", emoji: "🎖️" },
]

export default function GenresPage() {
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Explore by Genre
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover anime that match your taste on Kimono
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-muted-foreground">
              {GENRES.length} genres to explore
            </span>
          </div>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {GENRES.map((genre) => (
            <Link
              key={genre.id}
              href={`/search?genre=${encodeURIComponent(genre.name)}`}
              onMouseEnter={() => setHoveredGenre(genre.name)}
              onMouseLeave={() => setHoveredGenre(null)}
            >
              <Card className={`overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
                hoveredGenre === genre.name ? 'border-white' : 'border-transparent'
              }`}>
                <div className={`h-32 bg-gradient-to-br ${genre.color} flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="text-6xl relative z-10">{genre.emoji}</span>
                  {hoveredGenre === genre.name && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  )}
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold text-lg mb-1">{genre.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    Explore →
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Popular Combinations */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Combinations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/search?genre=Action">
              <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-24 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <span className="text-4xl">⚔️🔥</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">Action & Adventure</h3>
                  <p className="text-sm text-muted-foreground">
                    Epic battles and thrilling journeys
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/search?genre=Romance">
              <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-24 bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                  <span className="text-4xl">💕😊</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">Romance & Comedy</h3>
                  <p className="text-sm text-muted-foreground">
                    Heartwarming love stories with laughs
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/search?genre=Fantasy">
              <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-24 bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                  <span className="text-4xl">🧙✨</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">Fantasy & Magic</h3>
                  <p className="text-sm text-muted-foreground">
                    Magical worlds and supernatural powers
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/search?genre=Sci-Fi">
              <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                <div className="h-24 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-4xl">🚀🤖</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">Sci-Fi & Mecha</h3>
                  <p className="text-sm text-muted-foreground">
                    Futuristic tech and giant robots
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

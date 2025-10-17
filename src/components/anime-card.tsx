"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Star, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Anime } from "@/types/anime"

interface AnimeCardProps {
  anime: Anime
  showType?: boolean
  showRating?: boolean
  showYear?: boolean
  showEpisodes?: boolean
  className?: string
}

export function AnimeCard({
  anime,
  showType = true,
  showRating = true,
  showYear = true,
  showEpisodes = false,
  className = "",
}: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <Card className={`group overflow-hidden bg-card border-border hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 ${className}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={anime.image}
            alt={anime.title.english}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          {anime.status === "ONGOING" && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="bg-red-600 text-white text-xs">
                Ongoing
              </Badge>
            </div>
          )}

          {/* Type Badge */}
          {showType && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                {anime.type}
              </Badge>
            </div>
          )}

          {/* Episode Count */}
          {showEpisodes && anime.totalEpisodes > 0 && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                {anime.totalEpisodes} EP
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Title */}
            <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-red-500 transition-colors">
              {anime.title.english}
            </h3>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                {showYear && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{anime.year}</span>
                  </div>
                )}
                {showRating && anime.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span>{anime.rating}</span>
                  </div>
                )}
              </div>
              
              {anime.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{anime.duration}m</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1">
              {anime.genres.slice(0, 3).map((genre) => (
                <Badge
                  key={genre}
                  variant="outline"
                  className="text-xs px-2 py-0 border-muted-foreground/30"
                >
                  {genre}
                </Badge>
              ))}
              {anime.genres.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0 border-muted-foreground/30">
                  +{anime.genres.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
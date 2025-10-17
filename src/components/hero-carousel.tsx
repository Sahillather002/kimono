"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, ChevronLeft, ChevronRight, Star, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Anime } from "@/types/anime"

interface HeroCarouselProps {
  anime: Anime[]
  autoPlay?: boolean
  interval?: number
}

export function HeroCarousel({ 
  anime, 
  autoPlay = true, 
  interval = 5000 
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (!isPlaying || anime.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % anime.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, interval, anime.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + anime.length) % anime.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % anime.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!anime.length) return null

  const currentAnime = anime[currentIndex]

  return (
    <div className="relative w-full h-[100vh] max-h-[700px]  bg-muted">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentAnime.banner || currentAnime.image}
          alt={currentAnime.title.english}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Status Badge */}
            <div className="mb-4">
              {currentAnime.status === "ONGOING" && (
                <Badge className="bg-red-600 text-white">
                  Ongoing
                </Badge>
              )}
              {currentAnime.status === "UPCOMING" && (
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Upcoming
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {currentAnime.title.english}
            </h1>

            {/* Japanese Title */}
            {currentAnime.title.romaji && (
              <p className="text-xl text-white/80 mb-6">
                {currentAnime.title.romaji}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-white/90">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span>{currentAnime.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{currentAnime.year}</span>
              </div>
              {currentAnime.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentAnime.duration} min</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <span>{currentAnime.type}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{currentAnime.totalEpisodes} Episodes</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-8">
              {currentAnime.genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/90 mb-8 line-clamp-3 text-lg">
              {currentAnime.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href={`/anime/watch/${currentAnime.id}/1`}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Now
                </Button>
              </Link>
              <Link href={`/anime/${currentAnime.id}`}>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {anime.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-red-600"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Play/Pause Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <div className="w-4 h-4 space-y-1">
            <div className="h-1/2 bg-white" />
            <div className="h-1/2 bg-white" />
          </div>
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
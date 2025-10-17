"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, Settings, ArrowLeft, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Anime, Episode, VideoSource } from "@/types/anime"

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const animeId = params?.id as string
  const episodeId = params?.episodeId as string
  
  const [anime, setAnime] = useState<Anime | null>(null)
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [videoSources, setVideoSources] = useState<VideoSource[]>([])
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [selectedQuality, setSelectedQuality] = useState("720p")
  const [showEpisodeList, setShowEpisodeList] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!animeId || !episodeId) return
      
      setLoading(true)
      try {
        const [animeRes, episodeRes, videoRes] = await Promise.all([
          fetch(`/api/anime/${animeId}`),
          fetch(`/api/anime/${animeId}/episodes`),
          fetch(`/api/anime/${animeId}/watch/${episodeId}`)
        ])

        const animeData = await animeRes.json()
        const episodesData = await episodeRes.json()
        const videoData = videoRes.ok ? await videoRes.json() : []

        setAnime(animeData)
        setEpisodes(episodesData || [])
        
        // Find current episode
        const currentEpisode = episodesData?.find((ep: Episode) => ep.id === episodeId)
        setEpisode(currentEpisode || null)
        
        setVideoSources(videoData || [])
      } catch (error) {
        console.error("Failed to fetch watch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [animeId, episodeId])

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    const video = videoRef.current
    if (video) {
      video.addEventListener('mousemove', handleMouseMove)
      video.addEventListener('mouseenter', handleMouseMove)
      video.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setShowControls(false)
        }
      })
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      setCurrentTime(video.currentTime)
      setDuration(video.duration || 0)
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (video) {
      video.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (video) {
      video.volume = value[0]
      setVolume(value[0])
    }
  }

  const handleEpisodeChange = (newEpisodeId: string) => {
    router.push(`/anime/watch/${animeId}/${newEpisodeId}`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentVideoSource = videoSources.find(source => source.quality === selectedQuality) || videoSources[0]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="space-y-4">
          {/* Video Player Skeleton */}
          <div className="relative aspect-video bg-muted">
            <Skeleton className="w-full h-full" />
          </div>
          
          {/* Content Skeleton */}
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!anime || !episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Episode not found</h1>
          <Link href={`/anime/${animeId}`}>
            <Button>Back to Anime</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        {currentVideoSource ? (
          <video
            ref={videoRef}
            className="w-full h-full"
            src={currentVideoSource.url}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <Play className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Video source not available</p>
            </div>
          </div>
        )}

        {/* Video Controls */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Previous Episode */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  disabled={!episodes.find(ep => ep.episodeNumber === episode.episodeNumber - 1)}
                >
                  <SkipBack className="w-5 h-5" />
                </Button>

                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </Button>

                {/* Next Episode */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                  disabled={!episodes.find(ep => ep.episodeNumber === episode.episodeNumber + 1)}
                >
                  <SkipForward className="w-5 h-5" />
                </Button>

                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-white" />
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="w-20"
                  />
                </div>

                {/* Time */}
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                {/* Quality Selector */}
                {videoSources.length > 1 && (
                  <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="bg-black/50 text-white border border-white/30 rounded px-2 py-1 text-sm"
                  >
                    {videoSources.map((source) => (
                      <option key={source.quality} value={source.quality}>
                        {source.quality}
                      </option>
                    ))}
                  </select>
                )}

                {/* Episode List Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20 lg:hidden"
                  onClick={() => setShowEpisodeList(!showEpisodeList)}
                >
                  <List className="w-5 h-5" />
                </Button>

                {/* Fullscreen */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-white/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Episode Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Link href={`/anime/${animeId}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Anime
                  </Button>
                </Link>
              </div>
              
              <h1 className="text-2xl font-bold mb-2">
                {anime.title.english} - Episode {episode.episodeNumber}
              </h1>
              
              {episode.title && (
                <h2 className="text-lg text-muted-foreground mb-4">
                  {episode.title}
                </h2>
              )}

              {episode.description && (
                <p className="text-muted-foreground mb-4">
                  {episode.description}
                </p>
              )}

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {episode.duration && (
                  <span>Duration: {episode.duration} min</span>
                )}
                {episode.airDate && (
                  <span>Aired: {episode.airDate}</span>
                )}
              </div>
            </div>

            {/* Description */}
            {anime.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Anime Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {anime.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Episode List Sidebar */}
          <div className={`lg:block ${showEpisodeList ? 'block' : 'hidden'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Episodes
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setShowEpisodeList(false)}
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {episodes.map((ep) => (
                      <Button
                        key={ep.id}
                        variant={ep.id === episodeId ? "default" : "ghost"}
                        className="w-full justify-start h-auto p-3"
                        onClick={() => handleEpisodeChange(ep.id)}
                      >
                        <div className="text-left">
                          <div className="font-semibold">
                            Episode {ep.episodeNumber}
                          </div>
                          {ep.title && (
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {ep.title}
                            </div>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
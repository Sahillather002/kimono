"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, Star, Calendar, Clock, Tv, ChevronRight, User, BookOpen, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimeCard } from "@/components/anime-card"
import { useAuth } from "@/contexts/auth-context"
import { useAnimeList } from "@/hooks/use-anime-list"
import { useToast } from "@/hooks/use-toast"
import { Anime, Episode, Character } from "@/types/anime"

export default function AnimeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const animeId = params?.id as string
  const [anime, setAnime] = useState<Anime | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToList, setAddingToList] = useState(false)
  
  const { user } = useAuth()
  const { isInList, addToList, removeFromList } = useAnimeList()
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      if (!animeId) return
      
      setLoading(true)
      try {
        const [animeRes, episodesRes, charactersRes] = await Promise.all([
          fetch(`/api/anime/${animeId}`),
          fetch(`/api/anime/${animeId}/episodes`),
          fetch(`/api/anime/${animeId}/characters`)
        ])

        const animeData = await animeRes.json()
        const episodesData = await episodesRes.json()
        const charactersData = await charactersRes.json()

        setAnime(animeData)
        setEpisodes(episodesData || [])
        setCharacters(charactersData || [])
      } catch (error) {
        console.error("Failed to fetch anime data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [animeId])

  const handleAddToList = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add anime to your list",
        variant: "destructive",
      })
      router.push('/auth/signin')
      return
    }

    if (!anime) return

    setAddingToList(true)
    try {
      const inList = isInList(animeId)
      
      if (inList) {
        await removeFromList(animeId)
        toast({
          title: "Removed from List",
          description: `${anime.title.english || anime.title.romaji} has been removed from your list`,
        })
      } else {
        await addToList(
          animeId,
          anime.title.english || anime.title.romaji || '',
          anime.image,
          anime.type
        )
        toast({
          title: "Added to List",
          description: `${anime.title.english || anime.title.romaji} has been added to your list`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update your list. Please try again.",
        variant: "destructive",
      })
    } finally {
      setAddingToList(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Skeleton */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Background Banner */}
      {anime.banner && (
        <div className="absolute inset-0 h-[400px] -z-10">
          <Image
            src={anime.banner}
            alt={anime.title.english}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background to-background" />
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Cover Image */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={anime.image}
                alt={anime.title.english}
                fill
                className="object-cover"
                priority
              />
              {anime.status === "ONGOING" && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-600 text-white">Ongoing</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Anime Info */}
          <div className="lg:col-span-2 space-y-6 pt-8 lg:pt-0">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {anime.title.english}
                </h1>
                {anime.title.romaji && (
                  <p className="text-xl text-muted-foreground">
                    {anime.title.romaji}
                  </p>
                )}
                {anime.title.native && (
                  <p className="text-lg text-muted-foreground">
                    {anime.title.native}
                  </p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span>{anime.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{anime.year}</span>
                </div>
                {anime.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{anime.duration} min</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Tv className="w-4 h-4" />
                  <span>{anime.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{anime.totalEpisodes} Episodes</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {anime.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {episodes.length > 0 && (
                  <Link href={`/anime/watch/${anime.id}/${episodes[0].id}`}>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                      <Play className="w-5 h-5 mr-2" />
                      Watch Now
                    </Button>
                  </Link>
                )}
                <Button 
                  size="lg" 
                  variant={isInList(animeId) ? "default" : "outline"}
                  onClick={handleAddToList}
                  disabled={addingToList}
                >
                  {addingToList ? (
                    <>Loading...</>
                  ) : isInList(animeId) ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      In My List
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add to List
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            {anime.studios && anime.studios.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Studios</h4>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio) => (
                    <Badge key={studio} variant="outline">
                      {studio}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="episodes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="relations">Relations</TabsTrigger>
          </TabsList>

          {/* Episodes Tab */}
          <TabsContent value="episodes" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {episodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/anime/watch/${anime.id}/${episode.id}`}
                >
                  <Card className="group overflow-hidden hover:border-red-500 transition-all duration-300">
                    <div className="relative aspect-video">
                      {episode.thumbnail ? (
                        <Image
                          src={episode.thumbnail}
                          alt={episode.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Play className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                        Episode {episode.episodeNumber}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {episode.title}
                      </p>
                      {episode.duration && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {episode.duration} min
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {episodes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No episodes available</p>
              </div>
            )}
          </TabsContent>

          {/* Characters Tab */}
          <TabsContent value="characters" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {characters.map((character) => (
                <Link
                  key={character.id}
                  href={`/anime/characters/${character.id}`}
                >
                  <Card className="group overflow-hidden hover:border-red-500 transition-all duration-300">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={character.image}
                        alt={character.name.full || `${character.name.first} ${character.name.last || ""}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                        {character.name.full || `${character.name.first} ${character.name.last || ""}`}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {character.role}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {characters.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No character information available</p>
              </div>
            )}
          </TabsContent>

          {/* Relations Tab */}
          <TabsContent value="relations" className="space-y-4">
            {anime.relations && anime.relations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {anime.relations.map((relatedAnime) => (
                  <AnimeCard key={relatedAnime.id} anime={relatedAnime} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No related anime found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
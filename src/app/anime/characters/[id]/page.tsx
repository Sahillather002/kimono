"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, User, Mic, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Character, VoiceActor, Anime } from "@/types/anime"

export default function CharacterDetailPage() {
  const params = useParams()
  const characterId = params?.id as string
  const [character, setCharacter] = useState<Character | null>(null)
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!characterId) return
      
      setLoading(true)
      try {
        // In a real app, you'd fetch character details
        // For now, we'll use mock data
        const mockCharacter: Character = {
          id: characterId,
          name: {
            first: "Eren",
            last: "Yeager",
            full: "Eren Yeager",
            native: "エレン・イェーガー"
          },
          image: "https://cdn.myanimelist.net/images/characters/11/311327.jpg",
          description: "The main protagonist of Attack on Titan. Eren is a young boy who dreams of freedom and vows to exterminate all Titans after his mother is eaten by one.",
          role: "Main",
          voiceActors: [
            {
              id: "1",
              name: "Yuki Kaji",
              image: "https://cdn.myanimelist.net/images/voiceactors/1/54519.jpg",
              language: "Japanese"
            },
            {
              id: "2",
              name: "Bryce Papenbrook",
              image: "https://cdn.myanimelist.net/images/voiceactors/2/63385.jpg",
              language: "English"
            }
          ]
        }

        const mockAnime: Anime[] = [
          {
            id: "1",
            title: {
              english: "Attack on Titan",
              romaji: "Shingeki no Kyojin"
            },
            image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
            type: "TV",
            rating: "R-17",
            year: 2013,
            status: "FINISHED",
            description: "Humanity lives within cities protected by enormous walls.",
            genres: ["Action", "Drama", "Fantasy"],
            totalEpisodes: 25
          }
        ]

        setCharacter(mockCharacter)
        setAnimeList(mockAnime)
      } catch (error) {
        console.error("Failed to fetch character data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [characterId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-10 h-10" />
            <Skeleton className="h-8 w-48" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full max-w-sm" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Character not found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="#" onClick={() => window.history.back()}>
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Character Image and Basic Info */}
        <div className="space-y-6">
          {/* Character Image */}
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={character.image}
              alt={character.name.full || `${character.name.first} ${character.name.last || ""}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Character Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="font-semibold">
                  {character.name.full || `${character.name.first} ${character.name.last || ""}`}
                </p>
              </div>
              
              {character.name.native && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Native Name</p>
                  <p className="font-semibold">{character.name.native}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <Badge variant="secondary">{character.role}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Character Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Character Name */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {character.name.full || `${character.name.first} ${character.name.last || ""}`}
            </h1>
            {character.name.native && (
              <p className="text-xl text-muted-foreground mb-4">
                {character.name.native}
              </p>
            )}
          </div>

          {/* Description */}
          {character.description && (
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {character.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Voice Actors */}
          {character.voiceActors && character.voiceActors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Voice Actors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {character.voiceActors.map((va) => (
                    <div key={va.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        {va.image ? (
                          <Image
                            src={va.image}
                            alt={va.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <User className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{va.name}</p>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Globe className="w-3 h-3" />
                          <span>{va.language}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Anime Appearances */}
          {animeList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Anime Appearances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {animeList.map((anime) => (
                    <Link key={anime.id} href={`/anime/${anime.id}`}>
                      <div className="group relative aspect-[3/4] rounded-lg overflow-hidden">
                        <Image
                          src={anime.image}
                          alt={anime.title.english}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-xs font-semibold line-clamp-2">
                              {anime.title.english}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
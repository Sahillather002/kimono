"use client"

import { ProtectedRoute } from '@/components/protected-route'
import { useAuth } from '@/contexts/auth-context'
import { useAnimeList, AnimeListItem } from '@/hooks/use-anime-list'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Trash2, Star, Eye, CheckCircle, Clock, XCircle, Pause } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

export default function MyListPage() {
  return (
    <ProtectedRoute>
      <MyListContent />
    </ProtectedRoute>
  )
}

function MyListContent() {
  const { user } = useAuth()
  const { list, loading, removeFromList } = useAnimeList()

  const getListByStatus = (status: string) => {
    return list.filter(item => item.status === status)
  }

  const watchingList = getListByStatus('watching')
  const completedList = getListByStatus('completed')
  const planToWatchList = getListByStatus('plan_to_watch')
  const onHoldList = getListByStatus('on_hold')
  const droppedList = getListByStatus('dropped')

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Anime List</h1>
          <p className="text-muted-foreground">
            Track and manage your anime journey on Kimono
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{list.length} Total</Badge>
              <Badge variant="outline">{watchingList.length} Watching</Badge>
              <Badge variant="outline">{completedList.length} Completed</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="watching" className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-5">
            <TabsTrigger value="watching">
              <Eye className="w-4 h-4 mr-2" />
              Watching ({watchingList.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed ({completedList.length})
            </TabsTrigger>
            <TabsTrigger value="plan_to_watch">
              <Clock className="w-4 h-4 mr-2" />
              Plan to Watch ({planToWatchList.length})
            </TabsTrigger>
            <TabsTrigger value="on_hold">
              <Pause className="w-4 h-4 mr-2" />
              On Hold ({onHoldList.length})
            </TabsTrigger>
            <TabsTrigger value="dropped">
              <XCircle className="w-4 h-4 mr-2" />
              Dropped ({droppedList.length})
            </TabsTrigger>
          </TabsList>

          {['watching', 'completed', 'plan_to_watch', 'on_hold', 'dropped'].map((status) => {
            const statusList = getListByStatus(status)
            const statusLabels = {
              watching: { title: 'Currently Watching', icon: Eye },
              completed: { title: 'Completed', icon: CheckCircle },
              plan_to_watch: { title: 'Plan to Watch', icon: Clock },
              on_hold: { title: 'On Hold', icon: Pause },
              dropped: { title: 'Dropped', icon: XCircle }
            }
            const { title, icon: Icon } = statusLabels[status as keyof typeof statusLabels]

            return (
              <TabsContent key={status} value={status} className="mt-6">
                {loading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {[...Array(10)].map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="aspect-[2/3] w-full" />
                        <CardContent className="p-3">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-3 w-2/3" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : statusList.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Icon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No anime in {title}</h3>
                      <p className="text-muted-foreground mb-4">
                        Start adding anime to build your collection
                      </p>
                      <Link href="/search">
                        <Button className="bg-red-600 hover:bg-red-700">
                          Browse Anime
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {statusList.map((item) => (
                      <AnimeListItemCard
                        key={item.id}
                        item={item}
                        onRemove={() => removeFromList(item.anime_id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </div>
  )
}

function AnimeListItemCard({ item, onRemove }: { item: AnimeListItem; onRemove: () => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group relative">
      <Link href={`/anime/${item.anime_id}`}>
        <div className="aspect-[2/3] relative bg-muted">
          {item.anime_image ? (
            <Image
              src={item.anime_image}
              alt={item.anime_title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Play className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
            <Button
              size="sm"
              variant="destructive"
              className="w-full"
              onClick={(e) => {
                e.preventDefault()
                onRemove()
              }}
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </Link>
      <CardContent className="p-3">
        <Link href={`/anime/${item.anime_id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 mb-1 hover:text-red-600 transition-colors">
            {item.anime_title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {item.anime_type && <Badge variant="outline" className="text-xs">{item.anime_type}</Badge>}
          {item.rating && (
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{item.rating}/10</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AnimeCard } from "@/components/anime-card"
import { Anime } from "@/types/anime"

interface AnimeSectionProps {
  title: string
  anime: Anime[]
  viewAllHref?: string
  showType?: boolean
  showRating?: boolean
  showYear?: boolean
  showEpisodes?: boolean
}

export function AnimeSection({
  title,
  anime,
  viewAllHref,
  showType = true,
  showRating = true,
  showYear = true,
  showEpisodes = false,
}: AnimeSectionProps) {
  if (!anime.length) return null

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref}>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {anime.map((item) => (
            <div key={item.id} className="flex-none w-[200px] sm:w-[250px]">
              <AnimeCard
                anime={item}
                showType={showType}
                showRating={showRating}
                showYear={showYear}
                showEpisodes={showEpisodes}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
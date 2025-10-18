"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, X, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimeCard } from "@/components/anime-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Anime, SearchFilters } from "@/types/anime"

// Force dynamic rendering for this page since it depends on external APIs
export const dynamic = 'force-dynamic'

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery",
  "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
]

const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const [searchResults, setSearchResults] = useState<Anime[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    type: searchParams?.get("type") || "",
    status: searchParams?.get("status") || "",
    rating: searchParams?.get("rating") || "",
    genre: searchParams?.get("genre") || "",
    year: searchParams?.get("year") ? parseInt(searchParams.get("year")!) : undefined,
    sort: (searchParams?.get("sort") as any) || "TITLE",
    order: (searchParams?.get("order") as any) || "DESC",
  })

  const debouncedSearchQuery = useMemo(() => {
    const timer = setTimeout(() => {
      return searchQuery
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (searchQuery) params.set("q", searchQuery)
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            params.set(key, value.toString())
          }
        })

        const response = await fetch(`/api/search?${params.toString()}`)
        const data = await response.json()
        setSearchResults(data.results || [])
      } catch (error) {
        console.error("Search failed:", error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchQuery, filters])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      type: "",
      status: "",
      rating: "",
      genre: "",
      year: undefined,
      sort: "TITLE",
      order: "DESC",
    })
  }

  const activeFiltersCount = Object.values(filters).filter(
    value => value !== undefined && value !== "" && value !== "TITLE" && value !== "DESC"
  ).length

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Search Header */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h1 className="text-3xl font-bold">Browse Anime</h1>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 h-12 text-lg"
          />
        </div>

        {/* Category Tabs */}
        <Tabs value={filters.type || "all"} onValueChange={(value) => handleFilterChange("type", value === "all" ? "" : value)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
            <TabsTrigger value="TV" className="text-sm">TV Series</TabsTrigger>
            <TabsTrigger value="MOVIE" className="text-sm">Movies</TabsTrigger>
            <TabsTrigger value="OVA" className="text-sm">OVA</TabsTrigger>
            <TabsTrigger value="SPECIAL" className="text-sm">Special</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Filter Button */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] overflow-y-auto">
              <div className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </Button>
                </div>

                <Separator />

                {/* Type Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="TV">TV Series</SelectItem>
                      <SelectItem value="MOVIE">Movie</SelectItem>
                      <SelectItem value="OVA">OVA</SelectItem>
                      <SelectItem value="SPECIAL">Special</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="ONGOING">Ongoing</SelectItem>
                      <SelectItem value="FINISHED">Finished</SelectItem>
                      <SelectItem value="UPCOMING">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Rating</label>
                  <Select value={filters.rating} onValueChange={(value) => handleFilterChange("rating", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Ratings</SelectItem>
                      <SelectItem value="G">All Ages</SelectItem>
                      <SelectItem value="PG">Children</SelectItem>
                      <SelectItem value="PG-13">Teens 13+</SelectItem>
                      <SelectItem value="R-17">Violence & Profanity</SelectItem>
                      <SelectItem value="R+">Mild Nudity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Year</label>
                  <Select value={filters.year?.toString()} onValueChange={(value) => handleFilterChange("year", value ? parseInt(value) : undefined)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Years</SelectItem>
                      {years.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Genre Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Genre</label>
                  <div className="grid grid-cols-2 gap-2">
                    {genres.map(genre => (
                      <div key={genre} className="flex items-center space-x-2">
                        <Checkbox
                          id={genre}
                          checked={filters.genre === genre}
                          onCheckedChange={(checked) =>
                            handleFilterChange("genre", checked ? genre : "")
                          }
                        />
                        <label htmlFor={genre} className="text-sm">{genre}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={filters.sort} onValueChange={(value) => handleFilterChange("sort", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TITLE">Title</SelectItem>
                      <SelectItem value="RATING">Rating</SelectItem>
                      <SelectItem value="YEAR">Year</SelectItem>
                      <SelectItem value="POPULARITY">Popularity</SelectItem>
                      <SelectItem value="EPISODES">Episodes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Order */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Order</label>
                  <Select value={filters.order} onValueChange={(value) => handleFilterChange("order", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ASC">Ascending</SelectItem>
                      <SelectItem value="DESC">Descending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (value && value !== "" && key !== "sort" && key !== "order") {
                return (
                  <Badge key={key} variant="secondary" className="gap-1">
                    {key}: {value.toString()}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => handleFilterChange(key as keyof SearchFilters, "")}
                    />
                  </Badge>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-[3/4] w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <p className="text-muted-foreground">
              Found {searchResults.length} results
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                : "space-y-4"
            }>
              {searchResults.map((anime) => (
                viewMode === "grid" ? (
                  <AnimeCard key={anime.id} anime={anime} />
                ) : (
                  <Card key={anime.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-32 flex-shrink-0">
                        <img
                          src={anime.image}
                          alt={anime.title.english}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">{anime.title.english}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {anime.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {anime.genres.slice(0, 3).map(genre => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{anime.year}</span>
                          <span>{anime.type}</span>
                          <span>{anime.totalEpisodes} EP</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No anime found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Browse Anime</h1>
          </div>
          <div className="relative">
            <div className="h-12 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-[3/4] bg-muted rounded-md animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
}
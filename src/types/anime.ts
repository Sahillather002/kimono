export interface Anime {
  id: string;
  title: {
    english: string;
    romaji?: string;
    native?: string;
  };
  image: string;
  banner?: string;
  type: "TV" | "MOVIE" | "OVA" | "SPECIAL";
  rating: string;
  year: number;
  status: "ONGOING" | "FINISHED" | "UPCOMING";
  description: string;
  genres: string[];
  totalEpisodes: number;
  currentEpisode?: number;
  season?: string;
  studios?: string[];
  source?: string;
  duration?: number;
  averageScore?: number;
  popularity?: number;
  favorites?: number;
  relations?: Anime[];
  characters?: Character[];
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  description?: string;
  episodeNumber: number;
  thumbnail?: string;
  duration?: number;
  airDate?: string;
  watchUrl?: string;
}

export interface Character {
  id: string;
  name: {
    first: string;
    last?: string;
    full?: string;
    native?: string;
  };
  image: string;
  description?: string;
  role: string;
  voiceActors?: VoiceActor[];
}

export interface VoiceActor {
  id: string;
  name: string;
  image?: string;
  language: string;
}

export interface VideoSource {
  url: string;
  quality: string;
  format: string;
  size?: number;
}

export interface SearchFilters {
  type?: string;
  status?: string;
  rating?: string;
  genre?: string;
  year?: number;
  season?: string;
  sort?: "TITLE" | "RATING" | "YEAR" | "POPULARITY" | "EPISODES";
  order?: "ASC" | "DESC";
}

export interface SearchResult {
  results: Anime[];
  total: number;
  page: number;
  perPage: number;
  hasNextPage: boolean;
}

export interface TrendingAnime {
  id: string;
  anime: Anime;
  trendingRank: number;
  predictedRating: number;
  episodesWatched: number;
}
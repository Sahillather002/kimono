export interface popularAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[];
}
interface Anime {
  id: string;
  malId: number;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  status?: string;
  image: string;
  imageHash?: string;
  cover: string;
  coverHash?: string;
  popularity?: number;
  totalEpisodes?: number;
  currentEpisode?: number | null; // Assuming it can be null
  countryOfOrigin?: string;
  description: string;
  genres?: string[];
  rating?: number;
  color?: string | null | undefined;
  type?: string;
  releaseDate?: number;
  duration?: number;
}

export interface Title {
  romaji: string;
  english?: string;
  native: string;
  userPreferred: string;
}

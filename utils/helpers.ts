import { Title } from "@/types/animeType";

export const setBackgroundImage = (imageUrl: string) => {
  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
};

export const getAnimeTitle = (title: Title) => {
  if (!title) return ""; // Handle case when title is undefined

  return typeof title !== "string"
    ? title.english || title.native || title.romaji || title.userPreferred || "" // handle non-string types
    : title;
};

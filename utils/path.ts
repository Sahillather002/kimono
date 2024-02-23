const path = {
  anime: (id: string) => {
    return `/anime/${id}`;
  },
  watch: (id: string, _: string = "gogoanime") => {
    return `/anime/watch/${id}`;
  },
  genres: (genres: string) => {
    return `/anime/genres/${genres}`;
  },
};

export default path;

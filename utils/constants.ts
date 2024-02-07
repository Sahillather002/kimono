export let DOMAIN_URL = `${
    process.env.NODE_ENV === "production" ? "https" : "http"
  }://localhost:3000`;
  
  export let BASE_URL = DOMAIN_URL + "/api";
  export let NEWS_URL = DOMAIN_URL + "/api/news/ann";
  export let WAIFU_URL = "https://api.nekosapi.com/v3";
  export let KITSU_URL = "https://kitsu.io/api/edge";
  export let TMDB_URL = "https://api.themoviedb.org/3";
  
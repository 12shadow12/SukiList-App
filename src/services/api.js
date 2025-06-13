const API_KEY = "dc896070db9d8d6d60493354b9503650";
const BASE_URL = "https://api.themoviedb.org/3" 

export const getPopularAnimeMovies = async () => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&with_original_language=ja&with_keywords=210024&sort_by=popularity.desc`);
    const data = await response.json();
    return data.results;
  };
  
  export const searchMovies = async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  };
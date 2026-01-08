const axios = require("axios");
const { default: api } = require("../../frontend/src/api/axios");

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const API_KEY = process.env.TMDB_API_KEY;

const tmdb = api.create({
  baseURL: TMDB_BASE_URL,
  timeout: 12000, // 🚨 CRITICAL
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
  headers: {
    Accept: "application/json",
  },
});

// Search movies
const searchMovies = async (query) => {
  const res = await tmdb.get("/search/movie", { params: { query } });
  return res.data.results;
};

// Get movie details (SEQUENTIAL, NOT PARALLEL)
const getMovieDetails = async (tmdbId) => {
  const details = await tmdb.get(`/movie/${tmdbId}`);
  const credits = await tmdb.get(`/movie/${tmdbId}/credits`);
  const videos = await tmdb.get(`/movie/${tmdbId}/videos`);

  const movie = details.data;

  const cast =
    credits.data?.cast?.slice(0, 5).map((a) => a.name) || [];

  const director =
    credits.data?.crew?.find((p) => p.job === "Director")?.name || "Unknown";

  const trailer = videos.data?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  
  return {
    title: movie.title || "Untitled",
    description: movie.overview || "No description available",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
    trailerUrl: trailer
      ? `https://www.youtube.com/embed/${trailer.key}`
      : "",
    duration: movie.runtime || 0,
    genre: movie.genres?.map((g) => g.name) || [],
    rating: movie.vote_average
      ? Math.round(movie.vote_average) / 2
      : 0,
    releaseYear: movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : null,
    director,
    cast,
    tmdbId: movie.id,
  };
};

// Popular movies
const getPopularMovies = async () => {
  const res = await tmdb.get("/movie/popular");
  return res.data.results;
};

// Now playing
const getNowPlayingMovies = async () => {
  const res = await tmdb.get("/movie/now_playing");
  return res.data.results;
};

module.exports = {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getNowPlayingMovies,
};

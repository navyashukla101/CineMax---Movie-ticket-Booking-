const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getNowPlayingMovies,
} = require("../services/tmdbService");

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create movie
router.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    poster: req.body.poster,
    trailerUrl: req.body.trailerUrl,
    duration: req.body.duration,
    genre: req.body.genre,
    rating: req.body.rating,
    releaseYear: req.body.releaseYear,
    director: req.body.director,
    cast: req.body.cast,
    showtimes: req.body.showtimes,
    price: req.body.price,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update movie
router.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update fields
    if (req.body.title) movie.title = req.body.title;
    if (req.body.description) movie.description = req.body.description;
    if (req.body.poster) movie.poster = req.body.poster;
    if (req.body.trailerUrl !== undefined)
      movie.trailerUrl = req.body.trailerUrl;
    if (req.body.duration) movie.duration = req.body.duration;
    if (req.body.genre) movie.genre = req.body.genre;
    if (req.body.rating !== undefined) movie.rating = req.body.rating;
    if (req.body.releaseYear) movie.releaseYear = req.body.releaseYear;
    if (req.body.director) movie.director = req.body.director;
    if (req.body.cast) movie.cast = req.body.cast;
    if (req.body.showtimes) movie.showtimes = req.body.showtimes;
    if (req.body.price) movie.price = req.body.price;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete movie
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search movies from TMDB
router.get('/tmdb/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    const movies = await searchMovies(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get movie details from TMDB
router.get('/tmdb/details/:tmdbId', async (req, res) => {
  try {
    const movieDetails = await getMovieDetails(req.params.tmdbId);
    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular movies from TMDB
router.get('/tmdb/popular', async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get now playing movies from TMDB
router.get('/tmdb/now-playing', async (req, res) => {
  try {
    const movies = await getNowPlayingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Import movie from TMDB to database
router.post('/tmdb/import/:tmdbId', async (req, res) => {
  try {
    const movieDetails = await getMovieDetails(req.params.tmdbId);
    
    // Add default showtimes and price
    const { price, showtimes } = req.body || {};

    const movieData = {
      ...movieDetails,
      price: price ?? 12,
      showtimes: showtimes ?? [
        { time: "10:00 AM", date: new Date(), availableSeats: 100 },
        { time: "2:00 PM", date: new Date(), availableSeats: 100 },
        { time: "6:00 PM", date: new Date(), availableSeats: 100 },
        { time: "9:30 PM", date: new Date(), availableSeats: 100 },
      ],
    };


    const movie = new Movie(movieData);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

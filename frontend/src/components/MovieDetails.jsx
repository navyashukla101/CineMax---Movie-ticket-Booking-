import React, { useState } from 'react';
import { Star, Clock, Calendar, CreditCard, Play, X } from 'lucide-react';

const MovieDetails = ({ movie, onSelectShowtime }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="movie-details">
      <div className="details-header">
        <div className="poster-container">
          <img src={movie.poster} alt={movie.title} className="details-poster" />
          
          {movie.trailerUrl && (
            <button 
              className="play-trailer-btn"
              onClick={() => setShowTrailer(true)}
            >
              <Play size={24} />
              Watch Trailer
            </button>
          )}
        </div>

        <div className="details-info">
          <h1>{movie.title}</h1>
          
          {movie.releaseYear && (
            <p className="release-year">{movie.releaseYear}</p>
          )}

          <div className="details-meta">
            <span className="rating">
              <Star size={20} fill="currentColor" />
              {movie.rating}/5
            </span>
            <span className="duration">
              <Clock size={20} />
              {movie.duration} min
            </span>
          </div>

          <div className="genre-tags">
            {movie.genre && movie.genre.map(g => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>

          <p className="description">{movie.description}</p>

          {movie.director && (
            <p className="director">
              <strong>Director:</strong> {movie.director}
            </p>
          )}

          {movie.cast && movie.cast.length > 0 && (
            <p className="cast">
              <strong>Cast:</strong> {movie.cast.join(', ')}
            </p>
          )}

          <div className="price-info">
            <CreditCard size={24} />
            <span>${movie.price} per ticket</span>
          </div>
        </div>
      </div>

      <div className="showtimes-section">
        <h2>Select Showtime</h2>
        <div className="showtimes-grid">
          {movie.showtimes && movie.showtimes.map((showtime, index) => (
            <button
              key={index}
              className="showtime-btn"
              onClick={() => onSelectShowtime(showtime)}
            >
              <Calendar size={20} />
              {showtime.time}
            </button>
          ))}
        </div>
      </div>

      {showTrailer && movie.trailerUrl && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-trailer" onClick={() => setShowTrailer(false)}>
              <X size={32} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
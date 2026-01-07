import React from 'react';
import { Star, Clock, Calendar, CreditCard } from 'lucide-react';

const MovieDetails = ({ movie, onSelectShowtime }) => {
  return (
    <div className="movie-details">
      <div className="details-header">
        <img src={movie.poster} alt={movie.title} className="details-poster" />
        <div className="details-info">
          <h1>{movie.title}</h1>
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
            {movie.genre.map(g => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>
          <p className="description">{movie.description}</p>
          <div className="price-info">
            <CreditCard size={24} />
            <span>${movie.price} per ticket</span>
          </div>
        </div>
      </div>

      <div className="showtimes-section">
        <h2>Select Showtime</h2>
        <div className="showtimes-grid">
          {movie.showtimes.map((showtime, index) => (
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
    </div>
  );
};

export default MovieDetails;
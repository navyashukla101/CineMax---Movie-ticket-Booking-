import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie._id}`)}>
      <div className="movie-poster-wrapper">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-overlay">
          <button className="book-now-btn">Book Now</button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="rating">
            <Star size={16} fill="currentColor" />
            {movie.rating}
          </span>
          <span className="duration">
            <Clock size={16} />
            {movie.duration} min
          </span>
        </div>
        <div className="genre-tags">
          {movie.genre.map(g => (
            <span key={g} className="genre-tag">{g}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
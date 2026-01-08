import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminMovieCard = ({ movie, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-movie-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="admin-movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.releaseYear}</p>
        <p className="movie-genre">{movie.genre?.join(', ')}</p>
        <div className="admin-actions">
          <button 
            className="edit-btn"
            onClick={() => navigate(`/admin/edit-movie/${movie._id}`)}
          >
            <Edit size={18} />
            Edit
          </button>
          <button 
            className="delete-btn"
            onClick={() => onDelete(movie._id, movie.title)}
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMovieCard;
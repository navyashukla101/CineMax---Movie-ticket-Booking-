import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AdminMovieCard from '../components/AdminMovieCard'; // ADD THIS IMPORT

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: userLoading, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }
    fetchMovies();
  }, [loading, isAdmin]);

  const fetchMovies = async () => {
    try {
      const response = await api.get('/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`/movies/${id}`);
        alert('Movie deleted successfully!');
        fetchMovies();
      } catch (error) {
        alert('Error deleting movie: ' + error.response?.data?.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-header">
    <h1>Admin Panel - Manage Movies</h1>
    <div className="admin-header-actions">
    <button 
      className="import-movie-btn"
      onClick={() => navigate('/admin/search-import')}
    >
          <Search size={20} />
        Search & Import from TMDB
        </button>
      <button
        className="add-movie-btn"
        onClick={() => navigate('/admin/add-movie')}
      >
        <Plus size={20} />
        Add New Movie
      </button>
    </div>

      <div className="admin-movies-grid">
        {movies.map(movie => (
          <AdminMovieCard 
            key={movie._id} 
            movie={movie} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
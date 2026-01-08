import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Film } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const SearchImportMovie = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(null);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  React.useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      navigate('/');
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await api.get(`/api/movies/tmdb/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      alert('Error searching movies: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (tmdbId) => {
    setImporting(tmdbId);
    try {
      await api.post(`/api/movies/tmdb/import/${tmdbId}`);
      alert('Movie imported successfully!');
      navigate('/admin');
    } catch (error) {
      alert('Error importing movie: ' + error.response?.data?.message);
    } finally {
      setImporting(null);
    }
  };

  const handleViewDetails = async (tmdbId) => {
    try {
      const response = await api.get(`/api/movies/tmdb/details/${tmdbId}`);
      console.log('Movie Details:', response.data);
      alert(`Movie: ${response.data.title}\nRating: ${response.data.rating}\nDirector: ${response.data.director}`);
    } catch (error) {
      alert('Error fetching details');
    }
  };

  return (
    <div className="search-import-page">
      <div className="search-header">
        <h1>Search & Import Movies from TMDB</h1>
        <p>Search for movies and automatically import all details</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <Search size={24} />
          <input
            type="text"
            placeholder="Search for movies (e.g., Inception, Avatar)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results ({searchResults.length})</h2>
          <div className="results-grid">
            {searchResults.map(movie => (
              <div key={movie.id} className="result-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Poster'
                  }
                  alt={movie.title}
                />
                <div className="result-info">
                  <h3>{movie.title}</h3>
                  <p className="release-year">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                  </p>
                  <p className="overview">
                    {movie.overview?.substring(0, 100)}...
                  </p>
                  <div className="result-actions">
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewDetails(movie.id)}
                    >
                      <Film size={18} />
                      Details
                    </button>
                    <button
                      className="import-btn"
                      onClick={() => handleImport(movie.id)}
                      disabled={importing === movie.id}
                    >
                      <Plus size={18} />
                      {importing === movie.id ? 'Importing...' : 'Import'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchImportMovie;
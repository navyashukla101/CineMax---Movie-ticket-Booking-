import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

import { useAuth } from '../context/AuthContext';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    poster: '',
    trailerUrl: '',
    duration: '',
    genre: '',
    rating: '',
    releaseYear: '',
    director: '',
    cast: '',
    price: ''
  });

  useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await api.get(`/api/movies/${id}`);
      const movie = response.data;
      setFormData({
        title: movie.title,
        description: movie.description,
        poster: movie.poster,
        trailerUrl: movie.trailerUrl || '',
        duration: movie.duration,
        genre: movie.genre?.join(', ') || '',
        rating: movie.rating,
        releaseYear: movie.releaseYear || '',
        director: movie.director || '',
        cast: movie.cast?.join(', ') || '',
        price: movie.price
      });
    } catch (error) {
      alert('Error fetching movie');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      duration: parseInt(formData.duration),
      rating: parseFloat(formData.rating),
      releaseYear: parseInt(formData.releaseYear),
      price: parseFloat(formData.price),
      genre: formData.genre.split(',').map(g => g.trim()),
      cast: formData.cast.split(',').map(c => c.trim())
    };

    try {
  await api.put(`/movies/${id}`, movieData); // no /api prefix needed here
  alert('Movie updated successfully!');
  navigate('/admin');
} catch (error) {
  alert('Error updating movie: ' + error.response?.data?.message);
}

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-form-page">
      <div className="admin-form-container">
        <h1>Edit Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Poster URL *</label>
            <input
              type="url"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Trailer URL (YouTube Embed)</label>
            <input
              type="url"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Rating (0-5) *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Release Year *</label>
              <input
                type="number"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Genre (comma-separated) *</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Director</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Cast (comma-separated)</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};}

export default EditMovie;
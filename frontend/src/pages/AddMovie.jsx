import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AddMovie = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
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
    price: '',
    showtimes: [
      { time: '10:00 AM', availableSeats: 100 },
      { time: '2:00 PM', availableSeats: 100 },
      { time: '6:00 PM', availableSeats: 100 },
      { time: '9:30 PM', availableSeats: 100 }
    ]
  });

  React.useEffect(() => {
    if (!isAdmin()) {
      alert('Access denied. Admin only.');
      navigate('/');
    }
  }, []);

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
      cast: formData.cast.split(',').map(c => c.trim()),
      showtimes: formData.showtimes.map(st => ({
        ...st,
        date: new Date()
      }))
    };

    try {
      await axios.post('/api/movies', movieData);
      alert('Movie added successfully!');
      navigate('/admin');
    } catch (error) {
      alert('Error adding movie: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-container">
        <h1>Add New Movie</h1>
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
              placeholder="https://example.com/poster.jpg"
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
              placeholder="Action, Drama, Thriller"
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
              placeholder="Actor 1, Actor 2, Actor 3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/admin')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
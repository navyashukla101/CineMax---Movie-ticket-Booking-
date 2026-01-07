import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieDetails from '../components/MovieDetails';
import SeatSelection from '../components/SeatSelection';

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      {!selectedShowtime ? (
        <MovieDetails 
          movie={movie} 
          onSelectShowtime={setSelectedShowtime}
        />
      ) : (
        <SeatSelection 
          movie={movie} 
          showtime={selectedShowtime}
        />
      )}
    </div>
  );
};

export default Booking;
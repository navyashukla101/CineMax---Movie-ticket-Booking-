import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const SeatSelection = ({ movie, showtime }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;

  const toggleSeat = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/bookings', {
        user: user.id,
        movie: movie._id,
        showtime: showtime.time,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * movie.price
      });

      alert('Booking confirmed!');
      navigate('/my-bookings');
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seat-selection">
      <h1>Select Your Seats</h1>
      <div className="movie-header">
        <h2>{movie.title}</h2>
        <p>{showtime.time}</p>
      </div>

      <div className="screen">
        <div className="screen-label">SCREEN</div>
      </div>

      <div className="seats-container">
        {rows.map(row => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {[...Array(seatsPerRow)].map((_, i) => {
              const seatNumber = `${row}${i + 1}`;
              const isSelected = selectedSeats.includes(seatNumber);
              const isBooked = Math.random() > 0.8; // Simulate booked seats

              return (
                <button
                  key={seatNumber}
                  className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                  onClick={() => !isBooked && toggleSeat(seatNumber)}
                  disabled={isBooked}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="seat booked"></div>
          <span>Booked</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="booking-summary">
          <div className="summary-content">
            <div>
              <p>Selected Seats: {selectedSeats.join(', ')}</p>
              <p className="total">Total: ${selectedSeats.length * movie.price}</p>
            </div>
            <button 
              className="confirm-btn" 
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
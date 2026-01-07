import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const BookingConfirmation = ({ booking }) => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">
          <Ticket size={64} />
        </div>
        <h1>Booking Confirmed!</h1>
        <p>Your tickets have been booked successfully</p>
        <div className="booking-details">
          <h3>{booking.movie.title}</h3>
          <p>Showtime: {booking.showtime}</p>
          <p>Seats: {booking.seats.join(', ')}</p>
          <p>Total: ${booking.totalPrice}</p>
        </div>
        <button className="home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
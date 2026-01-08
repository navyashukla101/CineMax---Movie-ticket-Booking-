import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="my-bookings-page">
      <h1 className="page-title">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <Ticket size={64} />
          <p>No bookings yet</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking._id} className="booking-card">
              <img src={booking.movie.poster} alt={booking.movie.title} />
              <div className="booking-info">
                <h3>{booking.movie.title}</h3>
                <p><Calendar size={16} /> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p><MapPin size={16} /> Showtime: {booking.showtime}</p>
                <p>Seats: {booking.seats.join(', ')}</p>
                <p className="total">Total: ${booking.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
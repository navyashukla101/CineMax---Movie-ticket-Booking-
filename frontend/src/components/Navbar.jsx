import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          <Film size={32} />
          <span>CineMax</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          {user && <Link to="/my-bookings">My Bookings</Link>}
        </div>

        <div className="nav-auth">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <User size={20} />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
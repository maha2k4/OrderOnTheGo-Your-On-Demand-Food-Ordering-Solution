import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RestaurantNavbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="restaurant-navbar">
      <div className="restaurant-navbar-container">
        <Link to="/restaurant-dashboard" className="restaurant-brand">
          Restaurant Dashboard
        </Link>

        <div className="restaurant-nav-links">
          <Link to="/restaurant-dashboard" className="restaurant-nav-link">Home</Link>
          <Link to="/restaurant-dashboard/orders" className="restaurant-nav-link">Orders</Link>
          <Link to="/restaurant-dashboard/menu" className="restaurant-nav-link">Menu</Link>
          <Link to="/restaurant-dashboard/new-item" className="restaurant-nav-link">New Item</Link>
          <button onClick={handleLogout} className="restaurant-nav-link logout-btn">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RestaurantNavbar;
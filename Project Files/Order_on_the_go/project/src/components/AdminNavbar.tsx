import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminNavbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <Link to="/admin" className="admin-brand">
          SB Foods (admin)
        </Link>

        <div className="admin-nav-links">
          <Link to="/admin" className="admin-nav-link">Home</Link>
          <Link to="/admin/users" className="admin-nav-link">Users</Link>
          <Link to="/admin/orders" className="admin-nav-link">Orders</Link>
          <Link to="/admin/restaurants" className="admin-nav-link">Restaurants</Link>
          <button onClick={handleLogout} className="admin-nav-link logout-btn">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
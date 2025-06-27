import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    address: '',
    phone: '',
    restaurantImage: '',
    cuisine: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const success = await register(formData);
    if (success) {
      if (formData.role === 'restaurant') {
        setSuccess('Restaurant registration submitted for approval!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        navigate('/');
      }
    } else {
      setError('Registration failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="brand">SB Foods</Link>
          <h1>Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="role">Register as:</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="user">User</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">{formData.role === 'restaurant' ? 'Restaurant Name' : 'Full Name'}:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="form-textarea"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {formData.role === 'restaurant' && (
            <>
              <div className="form-group">
                <label htmlFor="restaurantImage">Restaurant Image URL:</label>
                <input
                  type="url"
                  name="restaurantImage"
                  id="restaurantImage"
                  value={formData.restaurantImage}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cuisine">Cuisine Type:</label>
                <input
                  type="text"
                  name="cuisine"
                  id="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., Fast Food, Indian, Chinese"
                  required
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="auth-button">
            Register
          </button>

          <div className="auth-links">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
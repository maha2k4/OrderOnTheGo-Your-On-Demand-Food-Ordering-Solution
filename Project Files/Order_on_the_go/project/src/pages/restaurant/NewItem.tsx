import React, { useState } from 'react';
import RestaurantNavbar from '../../components/RestaurantNavbar';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NewItem: React.FC = () => {
  const { restaurants, updateRestaurants } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      restaurantId: user?.restaurantId || ''
    };

    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === user?.restaurantId) {
        return {
          ...restaurant,
          items: [...restaurant.items, newItem]
        };
      }
      return restaurant;
    });

    updateRestaurants(updatedRestaurants);
    alert('Menu item added successfully!');
    navigate('/restaurant-dashboard/menu');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="restaurant-page">
      <RestaurantNavbar />
      
      <div className="restaurant-content">
        <h1>Add New Menu Item</h1>
        
        <form onSubmit={handleSubmit} className="menu-form">
          <div className="form-group">
            <label htmlFor="name">Item Name:</label>
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
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹):</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="url"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Biryani">Biryani</option>
              <option value="Noodles">Noodles</option>
              <option value="Beverages">Beverages</option>
              <option value="Sides">Sides</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Add Menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewItem;
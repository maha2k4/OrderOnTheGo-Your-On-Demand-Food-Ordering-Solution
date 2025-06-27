import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';
import { Plus } from 'lucide-react';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurants, addToCart } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Restaurant not found</h1>
        </div>
      </div>
    );
  }

  const categories = ['All', ...new Set(restaurant.items.map(item => item.category))];
  const filteredItems = selectedCategory === 'All' 
    ? restaurant.items 
    : restaurant.items.filter(item => item.category === selectedCategory);

  return (
    <div className="restaurant-details">
      <Navbar />
      
      <div className="restaurant-header">
        <div className="container">
          <div className="restaurant-header-content">
            <div className="restaurant-header-info">
              <h1 className="restaurant-title">{restaurant.name}</h1>
              <p className="restaurant-location">{restaurant.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="restaurant-content">
        <div className="container">
          <div className="restaurant-layout">
            <aside className="filters-sidebar">
              <h3>Filters</h3>
              
              <div className="filter-group">
                <h4>Sort By</h4>
                <div className="filter-options">
                  {['Popularity', 'Low-price', 'High-price', 'Discount', 'Rating'].map(option => (
                    <label key={option} className="filter-option">
                      <input
                        type="radio"
                        name="sortBy"
                        value={option}
                        checked={sortBy === option}
                        onChange={(e) => setSortBy(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Food Type</h4>
                <div className="filter-options">
                  {['Veg', 'Non Veg', 'Beverages'].map(type => (
                    <label key={type} className="filter-option">
                      <input type="checkbox" />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4>Categories</h4>
                <div className="filter-options">
                  {categories.map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <main className="menu-content">
              <div className="menu-header">
                <h2>All Items</h2>
              </div>

              <div className="menu-grid">
                {filteredItems.map(item => (
                  <div key={item.id} className="menu-item-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-item-image"
                    />
                    <div className="menu-item-info">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <p className="menu-item-description">{item.description}</p>
                      <div className="menu-item-footer">
                        <span className="menu-item-price">₹ {item.price}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="add-to-cart-btn"
                        >
                          <Plus size={16} />
                          Add Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
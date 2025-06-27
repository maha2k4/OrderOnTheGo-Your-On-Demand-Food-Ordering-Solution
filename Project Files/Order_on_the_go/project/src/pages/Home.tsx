import React from 'react';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { categories, popularRestaurants, restaurants } = useData();

  const categoryImages = {
    'Breakfast': 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    'Biryani': 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
    'Pizza': 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    'Noodles': 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    'Burger': 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    'Chinese': 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
    'South Indian': 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
    'North Indian': 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg'
  };

  return (
    <div className="home">
      <Navbar />
      
      <main className="home-main">
        {/* Categories Section */}
        <section className="categories-section">
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category} className="category-card">
                <img
                  src={categoryImages[category] || 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'}
                  alt={category}
                  className="category-image"
                />
                <h3 className="category-name">{category}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Restaurants Section */}
        <section className="popular-restaurants-section">
          <h2 className="section-title">Popular Restaurants</h2>
          <div className="restaurants-grid">
            {popularRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="restaurant-card"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-address">{restaurant.address}</p>
                  <div className="restaurant-meta">
                    <span className="restaurant-cuisine">{restaurant.cuisine}</span>
                    <span className="restaurant-rating">★ {restaurant.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Restaurants Section */}
        <section className="all-restaurants-section">
          <h2 className="section-title">All Restaurants</h2>
          <div className="restaurants-grid">
            {restaurants.filter(r => r.isApproved).map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="restaurant-card"
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-address">{restaurant.address}</p>
                  <div className="restaurant-meta">
                    <span className="restaurant-cuisine">{restaurant.cuisine}</span>
                    <span className="restaurant-rating">★ {restaurant.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
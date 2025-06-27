import React from 'react';
import RestaurantNavbar from '../../components/RestaurantNavbar';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Edit, Trash2 } from 'lucide-react';

const RestaurantMenu: React.FC = () => {
  const { restaurants } = useData();
  const { user } = useAuth();

  const restaurant = restaurants.find(r => r.id === user?.restaurantId);
  const menuItems = restaurant?.items || [];

  return (
    <div className="restaurant-page">
      <RestaurantNavbar />
      
      <div className="restaurant-content">
        <h1>Menu Management</h1>
        
        {menuItems.length === 0 ? (
          <div className="empty-menu">
            <p>No menu items yet. Add your first item!</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menuItems.map(item => (
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
                    <div className="menu-item-actions">
                      <button className="action-btn edit-btn">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete-btn">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
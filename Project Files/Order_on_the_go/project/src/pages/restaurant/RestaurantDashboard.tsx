import React from 'react';
import RestaurantNavbar from '../../components/RestaurantNavbar';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const RestaurantDashboard: React.FC = () => {
  const { orders, restaurants } = useData();
  const { user } = useAuth();

  const restaurant = restaurants.find(r => r.id === user?.restaurantId);
  const restaurantOrders = orders.filter(order => order.restaurantId === user?.restaurantId);
  const totalRevenue = restaurantOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="restaurant-dashboard">
      <RestaurantNavbar />
      
      <div className="restaurant-content">
        <h1>Restaurant Dashboard</h1>
        
        <div className="restaurant-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <div className="stat-number">{restaurantOrders.length}</div>
          </div>
          
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-number">₹ {totalRevenue}</div>
          </div>
          
          <div className="stat-card">
            <h3>Menu Items</h3>
            <div className="stat-number">{restaurant?.items.length || 0}</div>
          </div>
        </div>

        <div className="recent-orders">
          <h2>Recent Orders</h2>
          {restaurantOrders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="orders-list">
              {restaurantOrders.slice(0, 5).map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order.id}</span>
                    <span className={`order-status ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>Total: ₹ {order.total}</p>
                    <p>Items: {order.items.length}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
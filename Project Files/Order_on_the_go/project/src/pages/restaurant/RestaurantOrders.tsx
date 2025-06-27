import React from 'react';
import RestaurantNavbar from '../../components/RestaurantNavbar';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const RestaurantOrders: React.FC = () => {
  const { orders } = useData();
  const { user } = useAuth();

  const restaurantOrders = orders.filter(order => order.restaurantId === user?.restaurantId);

  return (
    <div className="restaurant-page">
      <RestaurantNavbar />
      
      <div className="restaurant-content">
        <h1>Orders</h1>
        
        {restaurantOrders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurantOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.items.length} items</td>
                    <td>₹ {order.total}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      <button className="action-btn accept-btn">Accept</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantOrders;
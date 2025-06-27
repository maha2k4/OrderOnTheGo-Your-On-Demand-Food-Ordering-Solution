import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

const AdminOrders: React.FC = () => {
  const { orders } = useData();

  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content">
        <h1>All Orders</h1>
        
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.userId}</td>
                  <td>{order.restaurantId}</td>
                  <td>₹ {order.total}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn view-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
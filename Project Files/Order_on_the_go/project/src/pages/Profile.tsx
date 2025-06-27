import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useData();

  const userOrders = orders.filter(order => order.userId === user?.id);

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="container">
          <h1 className="profile-title">My Profile</h1>
          
          <div className="profile-content">
            <div className="profile-info">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{user.name}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{user.phone}</span>
                </div>
                <div className="info-item">
                  <label>Address:</label>
                  <span>{user.address}</span>
                </div>
              </div>
            </div>

            <div className="order-history">
              <h2>Order History</h2>
              {userOrders.length === 0 ? (
                <p>No orders yet</p>
              ) : (
                <div className="orders-list">
                  {userOrders.map(order => (
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
      </div>
    </div>
  );
};

export default Profile;
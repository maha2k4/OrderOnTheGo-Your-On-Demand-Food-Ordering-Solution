import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

interface Approval {
  id: string;
  name: string;
  restaurantImage: string;
  address: string;
  cuisine: string;
}

const AdminDashboard: React.FC = () => {
  const { restaurants, orders, updateRestaurants } = useData();
  const navigate = useNavigate();

  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [popularRestaurants, setPopularRestaurants] = useState(
    restaurants.map(r => ({ ...r, isPopular: r.isPopular }))
  );

  useEffect(() => {
    const savedApprovals: Approval[] = JSON.parse(localStorage.getItem('restaurantApprovals') || '[]');
    setApprovals(savedApprovals);
  }, []);

  useEffect(() => {
    setPopularRestaurants(restaurants.map(r => ({ ...r, isPopular: r.isPopular })));
  }, [restaurants]);

  const handleApproval = (approvalId: string, approved: boolean) => {
    const updatedApprovals = approvals.filter(approval => approval.id !== approvalId);

    if (approved) {
      const approvedRestaurant = approvals.find(approval => approval.id === approvalId);
      if (approvedRestaurant) {
        const newRestaurant = {
          id: Date.now().toString(),
          name: approvedRestaurant.name,
          image: approvedRestaurant.restaurantImage,
          address: approvedRestaurant.address,
          cuisine: approvedRestaurant.cuisine,
          rating: 4.0,
          isPopular: false,
          isApproved: true,
          items: []
        };

        const updatedRestaurants = [...restaurants, newRestaurant];
        updateRestaurants(updatedRestaurants);
        setPopularRestaurants(updatedRestaurants.map(r => ({ ...r, isPopular: r.isPopular })));
      }
    }

    setApprovals(updatedApprovals);
    localStorage.setItem('restaurantApprovals', JSON.stringify(updatedApprovals));
  };

  const handlePopularUpdate = () => {
    const updatedRestaurants = restaurants.map(restaurant => {
      const popularRestaurant = popularRestaurants.find(pr => pr.id === restaurant.id);
      return {
        ...restaurant,
        isPopular: popularRestaurant ? popularRestaurant.isPopular : false
      };
    });

    updateRestaurants(updatedRestaurants);
    alert('Popular restaurants updated successfully!');
  };

  const togglePopular = (restaurantId: string) => {
    setPopularRestaurants(prev =>
      prev.map(restaurant =>
        restaurant.id === restaurantId
          ? { ...restaurant, isPopular: !restaurant.isPopular }
          : restaurant
      )
    );
  };

  const totalUsers = 25; // Static or mock data
  const approvedRestaurants = restaurants.filter(r => r.isApproved);

  return (
    <div className="admin-dashboard">
      <AdminNavbar />

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total users</h3>
            <div className="stat-number">{totalUsers}</div>
            <button
              className="stat-button"
              onClick={() => navigate('/admin/users')}
            >
              View all
            </button>
          </div>

          <div className="stat-card">
            <h3>All Restaurants</h3>
            <div className="stat-number">{approvedRestaurants.length}</div>
            <button
              className="stat-button"
              onClick={() => navigate('/admin/restaurants')}
            >
              View all
            </button>
          </div>

          <div className="stat-card">
            <h3>All Orders</h3>
            <div className="stat-number">{orders.length}</div>
            <button
              className="stat-button"
              onClick={() => navigate('/admin/orders')}
            >
              View all
            </button>
          </div>
        </div>

        <div className="admin-sections">
          <div className="admin-section">
            <h3>Popular Restaurants (promotions)</h3>
            <div className="popular-restaurants-list">
              {popularRestaurants.map(restaurant => (
                <label key={restaurant.id} className="restaurant-checkbox">
                  <input
                    type="checkbox"
                    checked={restaurant.isPopular}
                    onChange={() => togglePopular(restaurant.id)}
                  />
                  {restaurant.name}
                </label>
              ))}
            </div>
            <button onClick={handlePopularUpdate} className="update-button">
              Update
            </button>
          </div>

          <div className="admin-section">
            <h3>Approvals</h3>
            <div className="approvals-list">
              {approvals.length === 0 ? (
                <p>No new requests...</p>
              ) : (
                approvals.map(approval => (
                  <div key={approval.id} className="approval-item">
                    <div className="approval-info">
                      <h4>{approval.name}</h4>
                      <p>{approval.address}</p>
                      <p>{approval.cuisine}</p>
                    </div>
                    <div className="approval-actions">
                      <button
                        onClick={() => handleApproval(approval.id, true)}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(approval.id, false)}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

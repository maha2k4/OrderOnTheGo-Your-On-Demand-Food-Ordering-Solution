import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

const AdminRestaurants: React.FC = () => {
  const { restaurants } = useData();

  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content">
        <h1>All Restaurants</h1>
        
        <div className="restaurants-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Cuisine</th>
                <th>Rating</th>
                <th>Popular</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map(restaurant => (
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.cuisine}</td>
                  <td>★ {restaurant.rating}</td>
                  <td>
                    <span className={`status-badge ${restaurant.isPopular ? 'popular' : 'regular'}`}>
                      {restaurant.isPopular ? 'Popular' : 'Regular'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${restaurant.isApproved ? 'approved' : 'pending'}`}>
                      {restaurant.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view-btn">View</button>
                    <button className="action-btn edit-btn">Edit</button>
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

export default AdminRestaurants;
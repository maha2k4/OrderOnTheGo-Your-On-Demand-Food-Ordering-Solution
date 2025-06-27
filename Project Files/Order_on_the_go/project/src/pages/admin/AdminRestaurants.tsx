import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useData } from '../../context/DataContext';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  cuisine: string;
  rating: number;
  isPopular: boolean;
  isApproved: boolean;
}

const AdminRestaurants: React.FC = () => {
  const { restaurants, updateRestaurants } = useData();
  const [filtered, setFiltered] = useState<Restaurant[]>([]);

  useEffect(() => {
    setFiltered(restaurants);
  }, [restaurants]);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirmDelete) return;

    const updatedList = restaurants.filter(r => r.id !== id);
    updateRestaurants(updatedList);
    localStorage.setItem('restaurants', JSON.stringify(updatedList)); // Optional: for persistence
  };

  return (
    <div className="admin-page">
      <AdminNavbar />

      <div className="admin-content">
        <h1>All Restaurants</h1>

        {filtered.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <div className="restaurants-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Cuisine</th>
                  <th>Rating</th>
                  <th>Popular</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td><img src={r.image} alt={r.name} width={50} height={40} /></td>
                    <td>{r.name}</td>
                    <td>{r.address}</td>
                    <td>{r.cuisine}</td>
                    <td>{r.rating}</td>
                    <td>{r.isPopular ? 'Yes' : 'No'}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(r.id)}>
                        Delete
                      </button>
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

export default AdminRestaurants;

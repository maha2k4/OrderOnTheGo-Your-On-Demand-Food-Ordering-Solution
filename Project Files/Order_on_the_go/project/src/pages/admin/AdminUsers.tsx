import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const AdminUsers: React.FC = () => {
  // Mock users data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@user.com', phone: '+91 9876543210', orders: 5 },
    { id: '2', name: 'Jane Smith', email: 'jane@user.com', phone: '+91 9876543211', orders: 3 },
    { id: '3', name: 'Mike Johnson', email: 'mike@user.com', phone: '+91 9876543212', orders: 8 },
  ];

  return (
    <div className="admin-page">
      <AdminNavbar />
      
      <div className="admin-content">
        <h1>All Users</h1>
        
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.orders}</td>
                  <td>
                    <button className="action-btn view-btn">View</button>
                    <button className="action-btn delete-btn">Delete</button>
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

export default AdminUsers;
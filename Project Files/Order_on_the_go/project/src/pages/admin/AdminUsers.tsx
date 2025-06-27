import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  date: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const mockUsers: User[] = [
      
      ];

    const allUsers = [...mockUsers, ...storedUsers];
    setUsers(allUsers);

    const storedOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const getOrderCount = (userId: string) => {
    return orders.filter(order => order.userId === userId).length;
  };

  return (
    <div className="admin-page">
      <AdminNavbar />

      <div className="admin-content">
        <h1>All Users</h1>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Orders</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || '-'}</td>
                    <td>{getOrderCount(user.id)}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      <button className="action-btn delete-btn">Delete</button>
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

export default AdminUsers;


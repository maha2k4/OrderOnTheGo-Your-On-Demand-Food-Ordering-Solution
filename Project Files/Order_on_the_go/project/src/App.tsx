import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetails from './pages/RestaurantDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminRestaurants from './pages/admin/AdminRestaurants';

import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import RestaurantOrders from './pages/restaurant/RestaurantOrders';
import RestaurantMenu from './pages/restaurant/RestaurantMenu';
import NewItem from './pages/restaurant/NewItem';

import ProtectedRoute from './components/ProtectedRoute';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute role="admin">
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute role="admin">
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/restaurants"
                element={
                  <ProtectedRoute role="admin">
                    <AdminRestaurants />
                  </ProtectedRoute>
                }
              />

              {/* Restaurant Routes */}
              <Route
                path="/restaurant-dashboard"
                element={
                  <ProtectedRoute role="restaurant">
                    <RestaurantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/restaurant-dashboard/orders"
                element={
                  <ProtectedRoute role="restaurant">
                    <RestaurantOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/restaurant-dashboard/menu"
                element={
                  <ProtectedRoute role="restaurant">
                    <RestaurantMenu />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/restaurant-dashboard/new-item"
                element={
                  <ProtectedRoute role="restaurant">
                    <NewItem />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

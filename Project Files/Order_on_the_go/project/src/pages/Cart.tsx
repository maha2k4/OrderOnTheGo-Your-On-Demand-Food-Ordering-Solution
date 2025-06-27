import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, addOrder } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) return;

    const order = {
      userId: user.id,
      restaurantId: cartItems[0].restaurantId,
      items: cartItems,
      total,
      status: 'pending' as const,
      address: user.address || 'Default Address'
    };

    addOrder(order);
    alert('Order placed successfully!');
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="cart-page">
          <div className="container">
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add some delicious items from our restaurants!</p>
              <button onClick={() => navigate('/')} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-title">Your Cart</h1>
          
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    <span className="cart-item-price">₹ {item.price}</span>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeFromCart(item.id);
                          } else {
                            // Decrease quantity logic would go here
                          }
                        }}
                        className="quantity-btn"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="quantity-btn"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹ {total}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>₹ 50</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹ {total + 50}</span>
              </div>
              
              <button onClick={handlePlaceOrder} className="place-order-btn">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
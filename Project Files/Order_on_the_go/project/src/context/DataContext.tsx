import React, { createContext, useContext, useState, useEffect } from 'react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  cuisine: string;
  rating: number;
  isPopular: boolean;
  isApproved: boolean;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurantId: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered';
  createdAt: string;
  address: string;
}

interface DataContextType {
  restaurants: Restaurant[];
  categories: string[];
  cartItems: CartItem[];
  orders: Order[];
  popularRestaurants: Restaurant[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateRestaurants: (restaurants: Restaurant[]) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const categories = ['Breakfast', 'Biryani', 'Pizza', 'Noodles', 'Burger', 'Chinese', 'South Indian', 'North Indian'];

  useEffect(() => {
    // Initialize with mock data
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'McDonald\'s',
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
        address: 'Manikonda, Hyderabad',
        cuisine: 'Fast Food',
        rating: 4.5,
        isPopular: true,
        isApproved: true,
        items: [
          {
            id: '1',
            name: 'Mc Maharaj',
            description: 'Big size burger with chicken tikka and special sauce',
            price: 175,
            image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
            category: 'Burger',
            restaurantId: '1'
          },
          {
            id: '2',
            name: 'French Fries',
            description: 'Long French fries made from potato',
            price: 134,
            image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg',
            category: 'Sides',
            restaurantId: '1'
          },
          {
            id: '3',
            name: 'Cold Coffee',
            description: 'Tender coffee made from milk',
            price: 201,
            image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
            category: 'Beverages',
            restaurantId: '1'
          },
          {
            id: '4',
            name: 'Chicken Pizza',
            description: 'Crispy pizza with tasty chicken',
            price: 314,
            image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
            category: 'Pizza',
            restaurantId: '1'
          }
        ]
      },
      {
        id: '2',
        name: 'Andhra Spice',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        address: 'Gachibowli, Hyderabad',
        cuisine: 'South Indian',
        rating: 4.3,
        isPopular: true,
        isApproved: true,
        items: []
      },
      {
        id: '3',
        name: 'Paradise Grand',
        image: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
        address: 'Banjara Hills, Hyderabad',
        cuisine: 'Biryani',
        rating: 4.7,
        isPopular: false,
        isApproved: true,
        items: []
      },
      {
        id: '4',
        name: 'Minerva Grand',
        image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        address: 'Kondapur, Hyderabad',
        cuisine: 'Multi-cuisine',
        rating: 4.2,
        isPopular: false,
        isApproved: true,
        items: []
      }
    ];

    setRestaurants(mockRestaurants);
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const popularRestaurants = restaurants.filter(r => r.isPopular && r.isApproved);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        const updated = prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      } else {
        const updated = [...prev, { ...item, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updated));
        return updated;
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const updateRestaurants = (updatedRestaurants: Restaurant[]) => {
    setRestaurants(updatedRestaurants);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setOrders(prev => {
      const updated = [...prev, newOrder];
      localStorage.setItem('orders', JSON.stringify(updated));
      return updated;
    });
    
    clearCart();
  };

  return (
    <DataContext.Provider value={{
      restaurants,
      categories,
      cartItems,
      orders,
      popularRestaurants,
      addToCart,
      removeFromCart,
      clearCart,
      updateRestaurants,
      addOrder
    }}>
      {children}
    </DataContext.Provider>
  );
};
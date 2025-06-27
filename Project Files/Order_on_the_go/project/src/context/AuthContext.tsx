import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'restaurant' | 'user';
  restaurantId?: string;
  address?: string;
  phone?: string;
  password?: string;
  isApproved?: boolean;
  restaurantName?: string;
  restaurantImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@sbfoods.com',
      role: 'admin',
      password: 'admin123',
    },
    {
      id: '2',
      name: "McDonald's",
      email: 'mcdonalds@restaurant.com',
      role: 'restaurant',
      password: 'restaurant123',
      restaurantId: '1',
      isApproved: true,
      restaurantName: "McDonald's",
      restaurantImage: 'https://example.com/mcdonalds.jpg',
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john@user.com',
      role: 'user',
      password: 'user123',
      address: 'Manikonda, Hyderabad',
      phone: '+91 9876543210',
    },
  ];

  const login = async (
    email: string,
    password: string,
    role?: string
  ): Promise<boolean> => {
    setIsLoading(true);

    const registeredUsers: User[] = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const approvedRestaurants: User[] = JSON.parse(localStorage.getItem('restaurants') || '[]');

    const allUsers: User[] = [
      ...mockUsers,
      ...registeredUsers,
      ...approvedRestaurants
    ];

    const foundUser = allUsers.find(
      u =>
        u.email === email &&
        u.password === password &&
        (!role || u.role === role)
    );

    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);

    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      role: userData.role || 'user',
    };

    if (newUser.role === 'restaurant') {
      newUser.isApproved = false;
      const approvals = JSON.parse(localStorage.getItem('restaurantApprovals') || '[]');
      approvals.push(newUser);
      localStorage.setItem('restaurantApprovals', JSON.stringify(approvals));
    } else {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};






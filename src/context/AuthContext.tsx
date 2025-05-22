import React, { createContext, useState, useEffect, useContext } from 'react';
import { Admin, LoginCredentials } from '../types';
import api from '../services/api';

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedAdmin = localStorage.getItem('admin');
    const storedToken = localStorage.getItem('token');

    if (storedAdmin && storedToken) {
      const parsedAdmin: Admin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      api.setAuthToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post<{ admin: Admin; token: string }>('/auth/login', credentials);
      console.log('Login response:', response);

      if (response.success && response.data) {
        const { admin: loggedInAdmin, token } = response.data;
        console.log('Received token:', token);

        // Save admin data and token
        if (loggedInAdmin) {
          setAdmin(loggedInAdmin);
        }
        localStorage.setItem('admin', JSON.stringify(loggedInAdmin));
        localStorage.setItem('token', token);
        console.log('Token saved to localStorage:', localStorage.getItem('token'));
        api.setAuthToken(token);

        return true;
      } else {
        setError(response.error || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    api.removeAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
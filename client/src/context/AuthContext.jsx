import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('nexus_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const savedToken = localStorage.getItem('nexus_token');
      if (savedToken) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data.user);
          localStorage.setItem('nexus_user', JSON.stringify(res.data.user));
        } catch (err) {
          console.error('Session expired or invalid:', err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { token: receivedToken, user: receivedUser } = res.data;
    
    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('nexus_token', receivedToken);
    localStorage.setItem('nexus_user', JSON.stringify(receivedUser));
    return res.data;
  };

  const register = async (userData) => {
    const res = await authAPI.register(userData);
    const { token: receivedToken, user: receivedUser } = res.data;

    setToken(receivedToken);
    setUser(receivedUser);
    localStorage.setItem('nexus_token', receivedToken);
    localStorage.setItem('nexus_user', JSON.stringify(receivedUser));
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_user');
  };

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      setUser(res.data.user);
      localStorage.setItem('nexus_user', JSON.stringify(res.data.user));
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isTeacher: user?.role === 'teacher',
        isStudent: user?.role === 'student',
        login,
        register,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

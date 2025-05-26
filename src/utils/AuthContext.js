// ================== FRONTEND: AUTH CONTEXT (utils/AuthContext.js) ================== //
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProfile } from '../services/api';

const AuthContext = createContext();

// AuthProvider предоставляет контекст авторизации всему приложению
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Функция для сохранения токена после логина
  const login = (jwtToken) => {
    console.log("Received token:", jwtToken);
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  // Функция для выхода из системы
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  // После изменения токена загружаем профиль пользователя
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await getProfile();
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };
    fetchUserProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


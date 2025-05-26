// ================== FRONTEND: MAIN APPLICATION (App.js) ================== //

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import UserListPage from './pages/UserListPage';
import { AuthProvider, useAuth } from './utils/AuthContext';
import HomePage from './pages/HomePage';
import CustomNavbar from './components/CustomNavbar';

// Главный компонент приложения, содержащий маршруты.
function App() {
  return (
    <AuthProvider>
      <Router>
       <CustomNavbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/profile/edit" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
          <Route path="/profile/list" element={<PrivateRoute><UserListPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Компонент для защиты маршрутов, требующих авторизации.
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;

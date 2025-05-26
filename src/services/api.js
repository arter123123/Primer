// ================== FRONTEND: API SERVICES (services/api.js) ================== //

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

// Добавляем JWT токен ко всем запросам, если он есть
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = (targetEmail) =>
  targetEmail
    ? API.get(`/profile/view?targetEmail=${encodeURIComponent(targetEmail)}`)
    : API.get('/profile/view');

export const updateProfile = (data, url = '/profile/update') => API.put(url, data);
export const getUsers = () => API.get('/profile/list');
export const deleteUser = (targetEmail) => API.delete(`/profile/delete?targetEmail=${encodeURIComponent(targetEmail)}`);
import axios from 'axios';
import { isPublicPortalPath } from './routes';
import { useRpAuthStore } from './store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('rp-token') || useRpAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (!isPublicPortalPath(path) && !path.startsWith('/admin/login')) {
        useRpAuthStore.getState().clearAuth();
        const loginPath = path.startsWith('/admin')
          ? '/admin/login'
          : `/login?next=${encodeURIComponent(path)}`;
        window.location.href = loginPath;
      }
    }
    return Promise.reject(error);
  }
);

export default api;

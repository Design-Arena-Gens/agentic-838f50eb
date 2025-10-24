import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
  verifyEmail: (token) => api.get(`/api/auth/verify-email/${token}`),
  sendMobileOTP: (mobile) => api.post('/api/auth/send-mobile-otp', { mobile }),
  verifyMobileOTP: (otp) => api.post('/api/auth/verify-mobile-otp', { otp })
};

export const productAPI = {
  getAll: (params) => api.get('/api/products', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`),
  getCategories: () => api.get('/api/products/categories/list')
};

export const orderAPI = {
  create: (data) => api.post('/api/orders', data),
  getAll: () => api.get('/api/orders'),
  getById: (id) => api.get(`/api/orders/${id}`),
  updateStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status })
};

export const paymentAPI = {
  createPaymentIntent: (orderId) => api.post('/api/payments/create-payment-intent', { orderId })
};

export default api;

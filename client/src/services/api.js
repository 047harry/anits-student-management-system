import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://anits-student-management-system.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Authorization Bearer token to all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexus_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept 401 Unauthenticated errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        localStorage.removeItem('nexus_token');
        localStorage.removeItem('nexus_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

// Student CRUD Services (Point 12)
export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  getMyProfile: () => api.get('/students/me'),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getStats: () => api.get('/students/stats/overview')
};

// Quiz Services (Point 7)
export const quizAPI = {
  getAll: () => api.get('/quizzes'),
  getById: (id) => api.get(`/quizzes/${id}`),
  submit: (id, payload) => api.post(`/quizzes/${id}/submit`, payload),
  create: (data) => api.post('/quizzes', data)
};

export default api;

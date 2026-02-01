import axios from 'axios';

// Use environment variable or fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for refresh token
});

// Auth API calls
export const authAPI = {
  // Login
  login: (username, password) =>
    api.post('/auth/login', { username, password }),

  // Logout
  logout: (token) =>
    api.post(
      '/auth/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    ),

  // Refresh token
  refresh: () => api.post('/auth/refresh'),

  // Verify token and get current admin
  verify: (token) =>
    api.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Change password
  changePassword: (token, currentPassword, newPassword) =>
    api.put(
      '/auth/change-password',
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } },
    ),
};

// Add auth token interceptor
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Blog API calls
export const blogAPI = {
  // Get all blogs
  getAll: (params = {}) => api.get('/blogs', { params }),

  // Get single blog
  getOne: (identifier) => api.get(`/blogs/${identifier}`),

  // Create blog
  create: (data) => api.post('/blogs', data),

  // Update blog
  update: (id, data) => api.put(`/blogs/${id}`, data),

  // Delete blog
  delete: (id) => api.delete(`/blogs/${id}`),

  // Upload image
  uploadImage: (formData) =>
    api.post('/blogs/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Delete image
  deleteImage: (publicId) => api.delete(`/blogs/delete-image/${publicId}`),
};

// Job API calls
export const jobAPI = {
  // Get all jobs
  getAll: (params = {}) => api.get('/jobs', { params }),

  // Get single job
  getOne: (identifier) => api.get(`/jobs/${identifier}`),

  // Create job
  create: (data) => api.post('/jobs', data),

  // Update job
  update: (id, data) => api.put(`/jobs/${id}`, data),

  // Delete job
  delete: (id) => api.delete(`/jobs/${id}`),

  // Upload image
  uploadImage: (formData) =>
    api.post('/jobs/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Application API calls
export const applicationAPI = {
  // Get all applications
  getAll: (params = {}) => api.get('/applications', { params }),

  // Get single application
  getOne: (id) => api.get(`/applications/${id}`),

  // Update application status
  updateStatus: (id, status) => api.put(`/applications/${id}`, { status }),

  // Update application
  update: (id, data) => api.put(`/applications/${id}`, data),

  // Delete application
  delete: (id) => api.delete(`/applications/${id}`),
};

// Newsletter API calls
export const newsletterAPI = {
  // Get all subscribers
  getAll: (params = {}) => api.get('/newsletter', { params }),

  // Get newsletter stats
  getStats: () => api.get('/newsletter/stats'),

  // Unsubscribe (deactivate)
  unsubscribe: (id) => api.put(`/newsletter/${id}/unsubscribe`),

  // Reactivate
  reactivate: (id) => api.put(`/newsletter/${id}/reactivate`),

  // Delete subscriber permanently
  delete: (id) => api.delete(`/newsletter/${id}`),

  // Export CSV
  exportCSV: (activeOnly = false) =>
    api.get('/newsletter/export', {
      params: activeOnly ? { active: 'true' } : {},
      responseType: 'blob',
    }),
};

// Quotation API calls
export const quotationAPI = {
  // Get all quotations
  getAll: (params = {}) => api.get('/quotations', { params }),

  // Get single quotation
  getOne: (id) => api.get(`/quotations/${id}`),

  // Get quotation stats
  getStats: () => api.get('/quotations/stats'),

  // Update quotation (status, notes, etc.)
  update: (id, data) => api.put(`/quotations/${id}`, data),

  // Update quotation status
  updateStatus: (id, status) => api.put(`/quotations/${id}`, { status }),

  // Delete quotation
  delete: (id) => api.delete(`/quotations/${id}`),
};

// Notification API calls
export const notificationAPI = {
  // Get recent notifications
  getRecent: (limit = 10) => api.get('/notifications', { params: { limit } }),

  // Get notification counts
  getCounts: () => api.get('/notifications/counts'),
};

export default api;

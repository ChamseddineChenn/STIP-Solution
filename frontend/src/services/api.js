import axios from 'axios';

// Use environment variable or fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Blog API calls
export const blogAPI = {
  // Get all published blogs
  getAll: (params = {}) =>
    api.get('/blogs', { params: { ...params, published: 'true' } }),

  // Get single blog by ID or slug
  getOne: (identifier) => api.get(`/blogs/${identifier}`),
};

// Job API calls
export const jobAPI = {
  // Get all published jobs
  getAll: (params = {}) =>
    api.get('/jobs', { params: { ...params, published: 'true' } }),

  // Get single job by ID or slug
  getOne: (identifier) => api.get(`/jobs/${identifier}`),
};

// Application API calls
export const applicationAPI = {
  // Submit a job application
  submit: (formData) =>
    api.post('/applications', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Newsletter API calls
export const newsletterAPI = {
  // Subscribe to newsletter
  subscribe: (email, source = 'website') =>
    api.post('/newsletter/subscribe', { email, source }),
};

// Quotation API calls
export const quotationAPI = {
  // Submit a quotation request
  submit: (data) => api.post('/quotations', data),
};

export default api;

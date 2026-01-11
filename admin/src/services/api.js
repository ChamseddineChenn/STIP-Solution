import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;

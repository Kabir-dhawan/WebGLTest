// src/services/ApiService.js
import axios from 'axios';

// Base configuration for axios
const apiClient = axios.create({
    //baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1', // Set your API base URL here
    baseURL:  'http://localhost:5000/api/v1', // Set your API base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json'
    }
});

// // Request interceptor (e.g., for adding auth tokens)
// apiClient.interceptors.request.use(
//     (config) => {
//         // Example: Add token to headers if available
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response interceptor (e.g., for handling errors globally)
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle specific status codes
//         if (error.response) {
//             if (error.response.status === 401) {
//                 // Handle unauthorized access
//                 console.error('Unauthorized, logging out...');
//                 // Example: Redirect to login or clear token
//                 localStorage.removeItem('authToken');
//             }
//         }
//         return Promise.reject(error);
//     }
// );

const ApiService = {
    get: (url, params) => apiClient.get(url, { params }),
    post: (url, data) => apiClient.post(url, data),
    put: (url, data) => apiClient.put(url, data),
    delete: (url) => apiClient.delete(url)
};

export default ApiService;

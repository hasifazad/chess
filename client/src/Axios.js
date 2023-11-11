import axios from 'axios';



const BASE_URL = import.meta.env.VITE_API_BASE_URL
const api = axios.create({
    baseURL: `${BASE_URL}/api`,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api

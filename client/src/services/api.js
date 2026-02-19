import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const uploadReceipt = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/receipts/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const getReceipts = async () => {
    const response = await api.get('/api/receipts');
    return response.data;
};

export const deleteReceipt = async (receiptId) => {
    const response = await api.delete(`/api/receipts/${receiptId}`);
    return response.data;
};

export default api;

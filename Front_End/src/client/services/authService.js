
import axios from 'axios';

const API_URL ='http://localhost:3001/auth';

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};


import axios from 'axios';

//export const API_BASE_URL = "http://localhost:8000";
export const API_BASE_URL = "http://api.nethajividhyalayam.com";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

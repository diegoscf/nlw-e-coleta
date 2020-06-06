import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2301'
});

export default api;
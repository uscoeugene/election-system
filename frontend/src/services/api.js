import axios from 'axios';

//const API_URL = process.env.API_URL
const api = axios.create({
    
    baseURL: `http://localhost:5001/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;

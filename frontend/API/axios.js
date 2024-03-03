import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000'
});

export const POST_CONFIG = { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
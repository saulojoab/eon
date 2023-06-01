import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eon-api.onrender.com',
});

export default api;

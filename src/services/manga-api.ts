import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eon-manga-server.onrender.com',
});

export default api;

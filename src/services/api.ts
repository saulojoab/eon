import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.consumet.org',
});

export default api;

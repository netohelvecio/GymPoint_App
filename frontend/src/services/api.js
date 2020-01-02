import axios from 'axios';

// CONFIGURAÇÃO DA API
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

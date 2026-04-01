import axios from 'axios';

export const api = axios.create({
  baseURL: '', // пустышка
  timeout: 10000,
});

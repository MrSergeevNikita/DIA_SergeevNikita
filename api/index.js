import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://192.168.100.9:8000/' });

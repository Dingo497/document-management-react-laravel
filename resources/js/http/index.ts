import axios, { AxiosInstance } from 'axios';

const VITE_BASE_URL: string = 'http://localhost:8000/api';

const backendAPI: AxiosInstance = axios.create({
    baseURL: VITE_BASE_URL,
});

export { backendAPI };

import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api'
});

apiClient.interceptors.request.use(
  (config) => {
    const tokem = localStorage.getItem('authToken');
    if(tokem) {
      config.headers.Authorization = `Bearer ${tokem}`;
    }
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
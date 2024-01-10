import axios from 'axios'

const instance = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL, 
});

// Añade un interceptor para agregar el token a todas las solicitudes
instance.interceptors.request.use(
  (config) => {
    // Obtén el token del localStorage
    const token = localStorage.getItem('token'); // Reemplaza 'miToken' con la clave real utilizada para almacenar el token

    // Añade el token al encabezado de autorización si está presente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
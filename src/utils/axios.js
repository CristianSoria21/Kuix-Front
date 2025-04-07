import axios from 'axios';

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

// ==============================|| INTERCEPTORES DE AXIOS ||============================== //

// Interceptor para agregar token a cada solicitud
axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Redirigir al login si el usuario no está autenticado
        if (!window.location.href.includes('auth/login')) {
          window.location.pathname = 'auth/login';
        }
      } else if (status === 403) {
        console.warn('Acceso denegado: No tienes permisos suficientes.');
      }
    }

    return Promise.reject(error.response?.data || 'Error en el servicio');
  }
);

export default axiosServices;

// ==============================|| FUNCIONES FETCHER ||============================== //

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};

export const fetcherPost = async (args) => {
  const [url, data, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, data, { ...config });

  return res.data;
};

import axios from './axiosConfig';
const API_HOST = process.env.REACT_APP_API_URL;
const getRuta = (params) => `${API_HOST}/administrador/procesos/${params}`;
const obtenerProcesosFull = async () => {
  try {
    const ruta = getRuta('obtener-procesos')
    const resp = axios.get(ruta);
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const crearProceso = async (params) => {
  try {
    const ruta = getRuta('crear-proceso')
    const resp = axios.post(ruta,params);
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};
const cerrarProceso = async (params) => {
  try {
    const ruta = getRuta('cerrar-proceso')
    const resp = axios.post(ruta, params);
    return resp;
  } catch (error) {
    console.error('ERROR: ', error);
  }
};

export { obtenerProcesosFull, crearProceso, cerrarProceso };

import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_URL;
const API_GENERAL = process.env.REACT_APP_API_GENERAL;
const getRuta = (params) => `${API_HOST}${API_GENERAL}/estudiantes/${params}`;
const inscribirEstudianteService  = async (params) => {
  try {
    const ruta = getRuta('inscribir-estudiante')
    const resp = axios.post(ruta, params, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token-estudiante')}` },
    })
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
};

const subirFotoEstudiante = async (params) => {
  try {
    const ruta = getRuta('subir-foto-estudiante')
    const resp = axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }

};

export { inscribirEstudianteService , subirFotoEstudiante };

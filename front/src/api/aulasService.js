import axios from './axiosConfig'
const API_HOST = process.env.REACT_APP_API_URL;
const API_ADMINISTRADOR = process.env.REACT_APP_API_ADMINISTRADOR;
const getRuta = (ruta) => `${API_HOST}${API_ADMINISTRADOR}/aulas/${ruta}`;
const obtenerAulasService = async() => {
  try {
    const ruta = getRuta('obtener-aulas')
    const resp = await axios.get(ruta)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const crearAulaService = async(params) => {
  try {
    const ruta = getRuta('crear-aula')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const modificarAulaService = async(params) => {
  try {
    const ruta = getRuta('modificar-aula')
    const resp = await axios.put(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}
const buscarAulaService = async(params) => {
  try {
    const ruta = getRuta('buscar-aula')
    const resp = await axios.post(ruta, params)
    return resp
  }catch(error) {
    console.error('Ocurrio un error', error)
  }
}

export {
  obtenerAulasService,
  crearAulaService,
  modificarAulaService,
  buscarAulaService
}
import axios from 'axios'

const obtenerProcesosFull = async () => {
    try {
        
        const resp = axios.get(`http://localhost:3500/administrador/procesos/obtener-procesos`)
        return resp
    }catch(error) {
        console.error('ERROR: ', error)
    }
}
const crearProceso = async (params) => {
    try {
        const resp = axios.post(`http://localhost:3500/administrador/procesos/crear-proceso`, params)
        return resp
    }catch(error) {
        console.error('ERROR: ', error)
    }
}
const cerrarProceso = async(params) => {
    try {
        const resp = axios.post(`http://localhost:3500/administrador/procesos/cerrar-proceso`, params)
        return resp
    }catch(error) {
        console.error('ERROR: ', error)
    }
}

export { obtenerProcesosFull, crearProceso, cerrarProceso }
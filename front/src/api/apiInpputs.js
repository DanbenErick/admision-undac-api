import axios from 'axios'

const obtenerProcesosForm = async () => {
    try {
        const response = axios.get('http://localhost:3500/input-controls/obtener-procesos')
        return response
    }catch(error) {
        console.error(`Error: ${error}`)
    }
    
}
const obtenerCarrerasForm = async () => {
    try {
        const response = axios.get('http://localhost:3500/input-controls/obtener-carreras')
        return response
    }catch(error) {
        console.error('Error', error)
    }
}
const obtenerCarrerasCodigoForm = async () => {
    try {
        const response = axios.get('http://localhost:3500/input-controls/obtener-carreras-codigo')
        return response
    }catch(error) {
        console.error('Error', error)
    }
}
const obtenerFacultadesForm = async() => {
    try {
        const resp = axios.get('http://localhost:3500/input-controls/obtener-facultades')
        return resp
    }catch(error) {
        console.error('Error', error)
    }
}

export { obtenerCarrerasForm, obtenerProcesosForm, obtenerFacultadesForm, obtenerCarrerasCodigoForm }
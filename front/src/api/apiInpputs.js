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

export { obtenerCarrerasForm, obtenerProcesosForm }
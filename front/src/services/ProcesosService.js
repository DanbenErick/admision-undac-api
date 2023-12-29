import { obtenerProcesosFull } from "../api/apiProcesos"

const getProcesosService = async () => {
    try {
        const resp = await obtenerProcesosFull()
        return resp
    } catch (error) {
        console.error(`Error:`, error)
    }
}

export { getProcesosService }
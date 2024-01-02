import { logger } from '../../resources/manager-log.resource'

export class InputsControlsRepository {
    public obtenerProcesos = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID as value, NOMBRE as label FROM procesos ORDER BY id DESC`;
            // const query = `SELECT ID, NOMBRE, FECHA_REGISTRO, ESTADO FROM procesos ORDER BY id DESC`;
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }
        catch(error) {
            logger.error(`InputsControlsRepository.obtenerProcesos => ${error}`)
            throw error
        }
    }
    public obtenerCarreras = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID as value, ESCUELA_COMPLETA as label FROM carreras`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }
        catch(error) {
            logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`)
            throw error
        }
    }
    public obtenerFacultades = async(connection: any) => {
        try {
            const query = `select DISTINCT(FACULTAD), FACULTAD as value, FACULTAD as label from carreras`
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('InputsControlsRepository.obtenerFacultades => ', error)
            throw error
        }
    }
}
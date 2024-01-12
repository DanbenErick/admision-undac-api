import { ProcesosInterface } from '../../../interfaces/administrador/procesos.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class ProcesosRepository {
    public obtenerProcesos = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = `SELECT * FROM procesos ORDER BY ID DESC`;
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("ProcesosRepo.obtenerProcesos =>", (error))
            throw error
        }
    }
    public crearProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query =  await generarConsulta('procesos', params, null)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error('ProcesosRepo.crearProceso => ', error)
            throw error
        }
    }
    public verificarSiHayProcesoAbierto = async(connection: any, params: any) => {
        try {
            const query = `SELECT ID, NOMBRE FROM procesos WHERE ESTADO = 1`
            const [rows, fields] = await connection.promise().query(query)
            return rows
        }catch(error){
            logger.error('ProcesosRepo.verificarSiHayProcesoAbierto => ', error)
        }
    }
    public cerrarProceso = async(connection: any, params: ProcesosInterface) => {
        try {
            const query = await generarConsulta('procesos', params, `ID = ${params.ID}`)
            const data = Object.values(params)
            const result = await connection.promise().execute(query, data)
            return result
        }catch(error) {
            logger.error(`ProcesosRepo.cerrarProceso =>`, error)
            throw error
        }
    }
}
import { AulasInterface } from '../../../interfaces/administrador/aulas.interface';
import { CarreraInterface } from '../../../interfaces/administrador/carreras.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class AulasRepository {
    public obtenerAulas = async(connection: any) => {
        try {
            const query = `SELECT *, aulas.ID, procesos.NOMBRE AS NOMBRE_PROCESO FROM aulas LEFT JOIN procesos ON aulas.ID_PROCESO = procesos.ID ORDER BY aulas.ID DESC`;
            const [rows]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error("AulasRepository.obtenerAulas =>", (error))
            throw error
        }
    }
    public buscarAulas = async(connection: any, params: AulasInterface) => {
      try {
        const query = `SELECT *, aulas.ID, procesos.NOMBRE AS NOMBRE_PROCESO
        FROM aulas
        LEFT JOIN procesos ON aulas.ID_PROCESO = procesos.ID
        WHERE ID_PROCESO LIKE '%${params.ID_PROCESO}%' AND NOMBRE_AULA LIKE '%${params.NOMBRE_AULA}%' AND CAPACIDAD LIKE '%${params.CAPACIDAD}%'
        ORDER BY aulas.ID DESC`;
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error("AulasRepository.buscarAulas =>", (error))
        throw error
      }
    }
    public registarNuevaAula = async(connection: any, params: AulasInterface) => {
      try {
        const query = await generarConsulta('aulas', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('AulasRepository.registrarNuevaAula =>', error)
        throw error
      }
    }
    public modificarAula = async(connection: any, params: AulasInterface) => {
      try {
        const ID = params.ID
        delete params.ID
        const query = await generarConsulta('aulas', params, `ID = ${ID}`)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('AulasRepository.modificarAula => ', error)
        throw error
      }
    }
    public verificarSiHayAulaDisponible = async(connection: any, params: AulasInterface) => {
      try {
        const query = `SELECT aulas.id
        FROM aulas
        JOIN procesos ON aulas.ID_PROCESO = procesos.ID
        WHERE aulas.ocupado = false AND
          aulas.ID_PROCESO = '${params.ID_PROCESO}' AND
          procesos.estado = true
        ORDER BY aulas.id ASC
        LIMIT 1`
        const [rows]: any = connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('AulasRepository.verificarSiHayAulaDisponible => ', error)
        throw error
      }
    }
}

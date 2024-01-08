
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface';
import { logger } from '../../../resources/manager-log.resource';
import { generarConsulta } from '../../../util/util'

export class EstudianteGeneralRepository {
    
    public consultarEstudianteExiste = async(connection: any, params: EstudianteInterface) => {
      try {
        const query = `SELECT DNI FROM registros WHERE DNI = ${params.DNI}`
        const [rows]: any = await connection.promise().query(query)
        return rows
      }catch(error) {
        logger.error('EstudianteGeneralRepository.consultarEstudianteExiste =>', error)
        throw error
      }
    }
    public registrarEstudiante = async(connection: any, params: EstudianteInterface) => {
      try {
        const query = await generarConsulta('registros', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarEstudiante => ', error)
      }
    }
}


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
    /**
     * 
     
     *  dat_complementarios
        => 
        DNI, SEXO, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, DIRECCION, DISCAPACIDAD, TIPO_DISCAPACIDAD, ETNICA, CELULAR, TELEFONO, RUTA_FOTO, NOMBRE_COLEGIO, TIPO_COLEGIO

        inscritos
        =>
        DNI COD_CARRERA, AREA_CARRERA, PROCESO, MODALIDAD, SEDE_EXAM, PREPARATORIA, YEAR_CONCLU, FECHA_REGISTRO
     */
    public registrarDatosComplementariosEstudiante = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('dat_complementarios', params, null)
        const data = Object.values(params)
        console.log(query, data)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarDatosComplementariosEstudiante => ', error)
      }
    }
    public registrarInscripcionEstudiante = async(connection: any, params: any) => {
      try {
        const query = await generarConsulta('inscritos', params, null)
        const data = Object.values(params)
        const resp = await connection.promise().execute(query, data)
        return resp
      }catch(error) {
        logger.error('EstudianteGeneralRepository.registrarInscripcionEstudiante => ', error)
      }
    }
}

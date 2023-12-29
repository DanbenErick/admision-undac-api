import { logger } from '../../../resources/manager-log.resource'

export class VacantesRepository {
    public obtenerVacantes = async(connection:any, params: any) => {
        try {
            const query = `SELECT * FROM vacantes`
            const [rows, fields]: any = await connection.promise().query(query)
            return rows
        }catch(error) {
            logger.error('VacantesRepository.obtenerVacantes => ', error)
            throw error
        }
    }
}
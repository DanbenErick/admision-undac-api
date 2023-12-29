import connectMysql from "../../../config/connection.mysqldb";
import { VacantesInterface } from "../../../interfaces/administrador/vacantes.interface";
import { VacantesRepository } from "../../../repository/administrador/vacantes/vacantes.repository";

export class VacantesService {
    public vacantesRepo: VacantesRepository
    public constructor () {
        this.vacantesRepo = new VacantesRepository()
    }
    public obtenerVacantes = async(params: VacantesInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        
        try {
            const result = await this.vacantesRepo.obtenerVacantes(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
}
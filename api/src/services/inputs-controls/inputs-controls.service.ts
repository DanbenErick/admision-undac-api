import connectMysql from '../../config/connection.mysqldb'
import { InputsControlsRepository } from '../../repository/inputs-controls/inputs-controls.repository'

export class InputsControlsService {
    public inputsControlsRepo: InputsControlsRepository
    public constructor() {
        this.inputsControlsRepo = new InputsControlsRepository()
    }
    public obtenerProcesos = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerProcesos(dbConex, params)
            return result
        }
        catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public obtenerCarreras = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerCarreras(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public obtenerCarrerasPorCodigo = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inputsControlsRepo.obtenerCarrerasPorCodigoCarrera(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public obtenerFacultades = async() => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const resp = await this.inputsControlsRepo.obtenerFacultades(dbConex)
            return resp
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
}

import connectMysql from '../../../config/connection.mysqldb'
import { AulasInterface } from '../../../interfaces/administrador/aulas.interface'
import { AulasRepository } from '../../../repository/administrador/aulas/aulas.repository'



export class AulasService {
    
    public aulasRepo: AulasRepository
    public constructor() {
        this.aulasRepo = new AulasRepository()
    }

    public obtenerAulas = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.aulasRepo.obtenerAulas(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    public registrarNuevoAula = async(params: AulasInterface) => {
      const dbConex: any = await connectMysql.connectMysql()
      try {
        const [resp] = await this.aulasRepo.registarNuevaAula(dbConex, params)
        if(resp.affectedRows > 0) return { ok: true, message: 'Guardado correctamente' }
        return { ok: false, message: 'No se llego a guardar' }
      }catch(error) {
        await dbConex.rollback()
      }finally {
        await dbConex.close()
      }
    }
    public modificarAula = async(params: AulasInterface) => {
      const dbConex: any = await connectMysql.connectMysql()
      try {
        const [resp] = await this.aulasRepo.modificarAula(dbConex, params)
        if(resp.affectedRows > 0) return { ok: true, message: 'Guardado correctamente' }
        return { ok: false, message: 'No se llego a guardar' }
      }catch(error) {
        await dbConex.rollback()
      }finally {
        await dbConex.close()
      }
    }
    public buscarAula = async(params: AulasInterface) => {
      const dbConex: any = await connectMysql.connectMysql()
      try {
        params.ID_PROCESO = params.ID_PROCESO || ''
        params.NOMBRE_AULA = params.NOMBRE_AULA || ''
        params.CAPACIDAD = params.CAPACIDAD || ''
        const resp = await this.aulasRepo.buscarAulas(dbConex, params)
        return resp
      }catch(error) {
        await dbConex.rollback()
      }finally {
        await dbConex.close()
      }
    }
    
}
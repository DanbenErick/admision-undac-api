
import connectMysql from '../../../config/connection.mysqldb'
import { InscritosInterface } from '../../../interfaces/administrador/inscritos.interface'
import { InscritosRepository } from '../../../repository/administrador/inscritos/inscritos.repository'


export class InscritosService {
    
    public inscritosRepo: InscritosRepository
    public constructor() {
        this.inscritosRepo = new InscritosRepository()
        
    }

    public obtenerInscritos = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.inscritosRepo.obtenerInscritos(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
    public buscarInscrito = async(params: InscritosInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.inscritosRepo.buscarInscritos(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }

    public modificarInscrito = async(params: InscritosInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const [result] = await this.inscritosRepo.modificarInscritos(dbConex, params)
            if(result.affectedRows > 0) return { ok: true, message: 'Se modifico correctamente' }
            return { ok: false, message: 'No se pudo modificar' }
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
}
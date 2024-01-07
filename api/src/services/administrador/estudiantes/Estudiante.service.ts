
import connectMysql from '../../../config/connection.mysqldb'
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface'
import { EstudianteRepository } from '../../../repository/administrador/estudiantes/estudiantes.repository'



export class EstudiantesService {
    
    public estudianteRepo: EstudianteRepository
    public constructor() {
        this.estudianteRepo = new EstudianteRepository()
        
    }

    public obtenerEstudiantes = async() => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.estudianteRepo.obtenerEstudiantes(dbConnect)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
    public buscarCarreraPorFacultad = async(params: EstudianteInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result = await this.estudianteRepo.buscarEstudiante(dbConex, params)
            return result
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }

    public modificarEstudiante = async(params: EstudianteInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const [result] = await this.estudianteRepo.modificarEstudiante(dbConex, params)
            console.log("Resultado ", result.affectedRows)
            if(result.affectedRows > 0) return { ok: true, message: 'Se modifico correctamente' }
            return { ok: false, message: 'No se pudo modificar' }
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
    
    
}
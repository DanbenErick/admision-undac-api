
import connectMysql from '../../../config/connection.mysqldb'
import { EstudianteInterface } from '../../../interfaces/administrador/estudiantes.interface'
import bcrypt from 'bcrypt';
import { EstudianteGeneralRepository } from '../../../repository/general/estudiante/estudianteGeneral.repo'



export class EstudiantesGeneralService {
    
    public estudianteRepo: EstudianteGeneralRepository
    public constructor() {
        this.estudianteRepo = new EstudianteGeneralRepository()
        
    }

    public consultarEstudianteExiste = async(params: EstudianteInterface) => {
        const dbConnect: any = await connectMysql.connectMysql()
        try {
            const result = await this.estudianteRepo.consultarEstudianteExiste(dbConnect, params)
            return result
        }catch(error) {
            await dbConnect.rollback()
        }finally {
            await dbConnect.close()
        }
    }
    
    public registrarEstudiante = async(params: EstudianteInterface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            params.FECHA_REGISTRO = new Date()
            const password: any = params.PASSWORD
            const salt = await bcrypt.genSalt(10);
            const password_encript = await bcrypt.hash(password, salt);
            params.PASSWORD = password_encript
            const [result] = await this.estudianteRepo.registrarEstudiante(dbConex, params)
            console.log("Resultado ", result.affectedRows)
            if(result.affectedRows > 0) return { ok: true, message: 'Se modifico correctamente' }
            return { ok: false, message: 'Ocurrio un error al registrar' }
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
}
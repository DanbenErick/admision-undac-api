import connectMysql from '../../config/connection.mysqldb'
import { UsuarioInteface } from '../../interfaces/administrador/usuario.interface'
import SistemRepository from '../../repository/sistema/sistema.repository'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class SistemaService {
    
    public sistemaRepo: SistemRepository
    public constructor() {
        this.sistemaRepo = new SistemRepository()
    }
    public crearUsuarioAdmin = async(params: UsuarioInteface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            params.ROL = 1
            params.FECHA_REGISTRO = new Date()
            const password: any = params.PASSWORD
            const salt = await bcrypt.genSalt(10);
            const password_encript = await bcrypt.hash(password, salt);
            params.PASSWORD = password_encript
            console.log(params)
            const existenteUsuario: [] = await this.sistemaRepo.encontrarDuplidoUsuario(dbConex, params)
            if(existenteUsuario.length > 0) {
                return {ok: true, duplicateUser: true,  message: 'Hay otro usuario con dni con este usuario registrado'}
            }
            const result = await this.sistemaRepo.crearUsuarioAdmin(dbConex, params)
            if(result[0].affectedRows > 0) {
                return {ok: true, duplicateUser: false, message: 'Se registro usuario correctamente'}
            }
            return {ok: false, duplicateUser: false, message: 'Ocurrio un error al resitrar usuario  omn '}
        
        }
        catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public loginUsuarioAdmin = async(params: UsuarioInteface) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const result: any[] = await this.sistemaRepo.loginUsuarioAdmin(dbConex, params)
            if(result.length == 0) return { ok: false, message: 'No se encontro usuario' }
            const validarPassword = await bcrypt.compare(params.PASSWORD, result[0].PASSWORD)
            if(!validarPassword) return { ok: false, message: 'Usuario o contraseña incorrecta' }
            const token = jwt.sign({ _id: result[0].ID }, 'UNDAC_ADMISION');
            // send response with token 
            return { 
                ok: true, 
                message: 'Se autentico correctamente',
                user: result[0].USUARIO,
                name: result[0].NOMBRES || 'USUARIO',
                rol: result[0].ROL,
                token
            }
            // return result
        }catch(error) {
            await dbConex.rollback()
        }
        finally {
            await dbConex.close()
        }
    }
    public cerrarSesionAdmin = async(params: any) => {
        const dbConex: any = await connectMysql.connectMysql()
        try {
            const tokenBlacklist = new Set()
            const { TOKEN } = params
            tokenBlacklist.add(TOKEN)
            // TODO: Añadido a la lista negra el token
        }catch(error) {
            await dbConex.rollback()
        }finally {
            await dbConex.close()
        }
    }
}

export default SistemaService
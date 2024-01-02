import { Request, Response, Router } from 'express';
import SistemaService from '../../services/sistema/sistema.service'
import asyncHandler from 'express-async-handler';
import { UsuarioInteface } from '../../interfaces/administrador/usuario.interface';

class UsuarioADminController {
    public router: Router;
    public sistemaService: SistemaService
    constructor() {
        this.sistemaService = new SistemaService();
        this.router = Router();
        this.routes();
    }

    public crearUsuaroAdmin = async (req: Request, res: Response) => {
        try {
            const params: UsuarioInteface = req.body
            const result = await this.sistemaService.crearUsuarioAdmin(params)
            console.log(params)
            res.status(200).json(result)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    public loginUsuarioAdmin = async (req: Request, res: Response) => {
        try {
            const params: UsuarioInteface = req.body
            const resp: any = await this.sistemaService.loginUsuarioAdmin(params)
            res.status(200).header('auth-token', resp.token).json(resp)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    public cerrarSesionAdmin = async(req: Request, res: Response) => {
        try {
            const params = req.body
            const resp: any = await this.sistemaService.cerrarSesionAdmin(params)
            res.status(200).json(resp)
        }catch(error) {
            res.status(500).json(error)
        }
    }

    routes() {
        this.router.post('/crear-usuario', asyncHandler(this.crearUsuaroAdmin))
        this.router.post('/login-usuario', asyncHandler(this.loginUsuarioAdmin))
        this.router.post('/cerrar-sesion', asyncHandler(this.cerrarSesionAdmin))
        
    }
}

export default UsuarioADminController 
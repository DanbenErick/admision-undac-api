import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
// import { logger } from '../../../resources/manager-log.resource';
// import { MantenimientoUsuarioService } from '../../../service/seguridad/mantenimiento-usuario/MantenimientoUsuario.service';
import { ProcesosService } from '../../services/administrador/procesos/Procesos.service'

class ProcesosController {
    public router: Router;
    public procesosService: ProcesosService
    // public mantenimientoUsuarioService: MantenimientoUsuarioService;
    constructor() {
        // this.mantenimientoUsuarioService = new MantenimientoUsuarioService();
        this.procesosService = new ProcesosService();
        this.router = Router();
        this.routes();
    }

    public obtenerProcesos = async(req: Request, res: Response) => {
        try {
          const params: any[] = []
          const result = await this.procesosService.obtenerProcesos(params);
          console.log("Ingreso")
            res.status(200).json(result)
        }catch(error) {
            res.status(500).json(error)
        }
    }

    public obtenerUsuarios = async (req: Request, res: Response) =>  {
      try {
        const { usuario } = req.query;
        console.log('usuario:', usuario)
        let result;
        if(usuario != null) {
          // result = await this.mantenimientoUsuarioService.obtenerUsuarios(usuario);
        }else {
        //   result = await this.mantenimientoUsuarioService.obtenerUsuarios();
        }
        res.status(200).json(result)
      }catch(error) {
        // logger.error("obtenerusuarios => ruta ", error)
        res.status(500).json(error)
      }
    }

    public crearProceso = async (req: Request, res: Response) => {
      try {
        const params = req.body
        console.log(params)
        const result:any = await this.procesosService.crearProceso(params)
        if(result.ok) {
          res.status(200).json(result)
          
        }else {
          res.status(500).json(result)
        }
      }catch(error) {
        res.status(500).json(error)
      }
    }
    public cerrarProceso = async(req: Request, res: Response) => {
      try {
        const params = req.body
        const result: any = await this.procesosService.cerrarProceso(params)
        res.status(200).json(result)
      }catch(error) {
        res.status(500).json(error)
      }
    }

    routes() {
      this.router.get('/obtener-procesos', asyncHandler(this.obtenerProcesos))
      this.router.post('/crear-proceso', asyncHandler(this.crearProceso))
      this.router.post('/cerrar-proceso', asyncHandler(this.cerrarProceso))
        // this.router.get('/obtener-usuario-especifico', asyncHandler(this.obtenerUsuarioEspecifico))
        // this.router.get('/obtener-usuarios', asyncHandler(this.obtenerUsuarios));
        // this.router.get('/obtener-roles', asyncHandler(this.obtenerRoles));
        // this.router.get('/obtener-roles-by-param', asyncHandler(this.obtenerRolesByParam));
        // this.router.get('/obtener-companias', asyncHandler(this.obtenerCompanias));
        // this.router.get('/obtener-companias-by-param', asyncHandler(this.obtenerCompaniasByParam));
        
        // this.router.put('/modificar-usuario', this.modificarUsuario)
        // this.router.post('/registrar-usuario', this.registrarUsuario)
        // this.router.post('/registrar-roles', this.registrarRoles)
        // this.router.post('/registrar-roles-usuario', this.registrarRolesUsuario)
    }
}

export { ProcesosController };
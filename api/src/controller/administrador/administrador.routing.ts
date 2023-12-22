import { Router } from 'express';
import { ProcesosController } from './procesos.rest.api'
// import { MantenimientoOpcionesController } from './mantenimiento-opciones/mantenimiento-opciones.rest.api';


class AdministradorRouting {

  public router: Router;
    public procesos: ProcesosController;
//   public mantenimientoOpciones: MantenimientoOpcionesController;


  public constructor() {
    this.procesos = new ProcesosController()
    // this.mantenimientoOpciones = new MantenimientoOpcionesController();
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.use('/procesos', this.procesos.router)
    // this.router.use('/', this.mantenimientoRoles.router);
    // this.router.use('/procesos', this)
    // this.router.use('/mantenimiento-tipo-graficos', this.mantenimientoTipoGraficos.router);
    // this.router.use('/mantenimiento-opciones', this.mantenimientoOpciones.router);
    // this.router.use('/mantenimiento-usuarios', this.mantenimientoUsuarios.router);
    // this.router.use('/asignar-opciones-rol', this.mantenimientoOpcionesRol.router);

  }
}

export default new AdministradorRouting().router;
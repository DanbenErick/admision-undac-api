import { Router } from 'express';
// import { MantenimientoOpcionesController } from './mantenimiento-opciones/mantenimiento-opciones.rest.api';


class SeguridadRouting {

  public router: Router;
  
//   public mantenimientoOpciones: MantenimientoOpcionesController;


  public constructor() {
    
    // this.mantenimientoOpciones = new MantenimientoOpcionesController();
    // this.router = Router();
    // this.routes();
  }

  public routes() {
    // this.router.use('/', this.mantenimientoRoles.router);
    // this.router.use('/procesos', this)
    // this.router.use('/mantenimiento-tipo-graficos', this.mantenimientoTipoGraficos.router);
    // this.router.use('/mantenimiento-opciones', this.mantenimientoOpciones.router);
    // this.router.use('/mantenimiento-usuarios', this.mantenimientoUsuarios.router);
    // this.router.use('/asignar-opciones-rol', this.mantenimientoOpcionesRol.router);

  }
}

export default new SeguridadRouting().router;
import { Router } from 'express';
import { ProcesosController } from './procesos.rest.api'
import VacantesController from './vacantes.rest.api';
// import { MantenimientoOpcionesController } from './mantenimiento-opciones/mantenimiento-opciones.rest.api';


class AdministradorRouting {

  public router: Router;
    public procesos: ProcesosController;
    public vacantes: VacantesController



  public constructor() {
    this.procesos = new ProcesosController()
    this.vacantes = new VacantesController()
    
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.use('/procesos', this.procesos.router)
    this.router.use('/vacantes', this.vacantes.router)
  }
}

export default new AdministradorRouting().router;
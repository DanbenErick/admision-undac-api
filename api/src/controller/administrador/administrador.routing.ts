import { Router } from 'express';
import { ProcesosController } from './procesos.rest.api'
import VacantesController from './vacantes.rest.api';
import CarrerasController from './carrera.routing';
import VoucherController from './voucher.rest.api';

class AdministradorRouting {

  public router: Router;
    public procesos: ProcesosController;
    public vacantes: VacantesController
    public carreras: CarrerasController
    public vouchers: VoucherController


  public constructor() {
    this.procesos = new ProcesosController()
    this.vacantes = new VacantesController()
    this.carreras = new CarrerasController()
    this.vouchers = new VoucherController()

    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.use('/procesos', this.procesos.router)
    this.router.use('/vacantes', this.vacantes.router)
    this.router.use('/carreras', this.carreras.router)
    this.router.use('/vouchers', this.vouchers.router)
  }
}

export default new AdministradorRouting().router;
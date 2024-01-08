import { Router } from 'express';
import EstudianteController from './estudiantes.rest.api';


class generalRouting {

  public router: Router;
    public estudiante: EstudianteController;
    


  public constructor() {
    this.estudiante = new EstudianteController()
    

    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.use('/estudiantes', this.estudiante.router)
    
  }
}

export default new generalRouting().router;
// Modulos Externos
import express from 'express';

// Routes
import appRouting from './controller/seguridad/seguridad.routing';
class ApiRoutes {
  public app = express();

  public constructor() {
    this.routes();
  }

  public routes() {
    
    this.app.use('/app', appRouting);
  }
}

export { ApiRoutes };
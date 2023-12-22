// Modulos Externos
import express from 'express';

// Routes
import seguridadRouting from './controller/seguridad/seguridad.routing';
class ApiRoutes {
  public app = express();

  public constructor() {
    this.routes();
  }

  public routes() {
    
    this.app.use('/seguridad', seguridadRouting);
  }
}

export { ApiRoutes };
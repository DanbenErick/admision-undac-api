// Modulos Externos
import express from 'express';

// Routes
import administradorRouting from './controller/administrador/administrador.routing'
import seguridadRouting from './controller/seguridad/seguridad.routing';
import inputControlsRouting from './controller/input-controls/inputs-controls.routing'

class ApiRoutes {
  public app = express();

  public constructor() {
    this.routes();
  }

  public routes() {
    this.app.use('/administrador', administradorRouting)
    this.app.use('/input-controls', inputControlsRouting)
    // this.app.use('/seguridad', seguridadRouting);
  }
}

export { ApiRoutes };
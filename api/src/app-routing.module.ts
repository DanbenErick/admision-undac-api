
// Modulos Externos
import express from 'express';
import bearer from 'express-bearer-token'
// Routes
import administradorRouting from './controller/administrador/administrador.routing'
import inputControlsRouting from './controller/input-controls/inputs-controls.routing'
import sistemaRouting from './controller/sistema/sistema.routing';
import generalRouting from './controller/general/general.routing';

class ApiRoutes {
  public app = express();

  public constructor() {
    this.app.use(bearer())
    this.routes();
  }

  public routes() {
    
    this.app.use('/administrador', administradorRouting)
    this.app.use('/input-controls', inputControlsRouting)
    this.app.use('/sistema', sistemaRouting)
    this.app.use('/general', generalRouting)
  }
}

export { ApiRoutes };


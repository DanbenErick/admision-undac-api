"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procesos_rest_api_1 = require("./procesos.rest.api");
// import { MantenimientoOpcionesController } from './mantenimiento-opciones/mantenimiento-opciones.rest.api';
class AdministradorRouting {
    //   public mantenimientoOpciones: MantenimientoOpcionesController;
    constructor() {
        this.procesos = new procesos_rest_api_1.ProcesosController();
        // this.mantenimientoOpciones = new MantenimientoOpcionesController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use('/procesos', this.procesos.router);
        // this.router.use('/', this.mantenimientoRoles.router);
        // this.router.use('/procesos', this)
        // this.router.use('/mantenimiento-tipo-graficos', this.mantenimientoTipoGraficos.router);
        // this.router.use('/mantenimiento-opciones', this.mantenimientoOpciones.router);
        // this.router.use('/mantenimiento-usuarios', this.mantenimientoUsuarios.router);
        // this.router.use('/asignar-opciones-rol', this.mantenimientoOpcionesRol.router);
    }
}
exports.default = new AdministradorRouting().router;

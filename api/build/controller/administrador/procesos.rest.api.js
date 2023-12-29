"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcesosController = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import { logger } from '../../../resources/manager-log.resource';
// import { MantenimientoUsuarioService } from '../../../service/seguridad/mantenimiento-usuario/MantenimientoUsuario.service';
const Procesos_service_1 = require("../../services/administrador/procesos/Procesos.service");
class ProcesosController {
    // public mantenimientoUsuarioService: MantenimientoUsuarioService;
    constructor() {
        this.obtenerProcesos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = [];
                const result = yield this.procesosService.obtenerProcesos(params);
                console.log("Ingreso");
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.obtenerUsuarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario } = req.query;
                console.log('usuario:', usuario);
                let result;
                if (usuario != null) {
                    //   result = await this.mantenimientoUsuarioService.obtenerUsuarios(usuario);
                }
                else {
                    //   result = await this.mantenimientoUsuarioService.obtenerUsuarios();
                }
                res.status(200).json(result);
            }
            catch (error) {
                // logger.error("obtenerusuarios => ruta ", error)
                res.status(500).json(error);
            }
        });
        // this.mantenimientoUsuarioService = new MantenimientoUsuarioService();
        this.procesosService = new Procesos_service_1.ProcesosService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-procesos', (0, express_async_handler_1.default)(this.obtenerProcesos));
        // this.router.get('/obtener-usuario-especifico', asyncHandler(this.obtenerUsuarioEspecifico))
        // this.router.get('/obtener-usuarios', asyncHandler(this.obtenerUsuarios));
        // this.router.get('/obtener-roles', asyncHandler(this.obtenerRoles));
        // this.router.get('/obtener-roles-by-param', asyncHandler(this.obtenerRolesByParam));
        // this.router.get('/obtener-companias', asyncHandler(this.obtenerCompanias));
        // this.router.get('/obtener-companias-by-param', asyncHandler(this.obtenerCompaniasByParam));
        // this.router.put('/modificar-usuario', this.modificarUsuario)
        // this.router.post('/registrar-usuario', this.registrarUsuario)
        // this.router.post('/registrar-roles', this.registrarRoles)
        // this.router.post('/registrar-roles-usuario', this.registrarRolesUsuario)
    }
}
exports.ProcesosController = ProcesosController;

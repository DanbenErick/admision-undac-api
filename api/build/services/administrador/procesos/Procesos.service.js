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
exports.ProcesosService = void 0;
// import connectOracle from '../../../config/connection.oracledb';
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const procesos_repository_1 = require("../../../repository/administrador/procesos/procesos.repository");
// import { EstadosHttp } from '../../../constantes/mensajes/mensajes.constant';
// import { MantenimientoOpcionesRolRepository } from "../../../repository/seguridad/mantenimiento-opciones-rol/MantenimientoOpcionesRol.repository";
// import { logger } from '../../../resources/manager-log.resource';
class ProcesosService {
    constructor() {
        this.obtenerProcesos = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.procesosRepo.obtenerProcesos(dbConnect, params);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.obtenerRolesByParam = (param) => __awaiter(this, void 0, void 0, function* () {
            // let connection: any = await connectOracle.conectarOracle()
            // try {
            //     param.descripcion = param.descripcion;
            //     console.log("PARAMTROS RECIBIDOS => ", param)
            //     // const result = await this.asignarOpcionesRolRepository.obtenerRolesByParam(connection, param)
            //     // return result;
            // } catch (error) {
            //     // logger.error("obtenerRolesByParam Serv => ", error)
            //     await connection.rollback();
            //     throw error;
            // } finally {
            //     await connection.close();
            // }
        });
        this.procesosRepo = new procesos_repository_1.ProcesosRepository();
        // this.asignarOpcionesRolRepository = new MantenimientoOpcionesRolRepository();
    }
}
exports.ProcesosService = ProcesosService;

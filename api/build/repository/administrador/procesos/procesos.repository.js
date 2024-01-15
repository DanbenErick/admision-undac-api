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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcesosRepository = void 0;
const manager_log_resource_1 = require("../../../resources/manager-log.resource");
const util_1 = require("../../../util/util");
class ProcesosRepository {
    constructor() {
        this.obtenerProcesos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM procesos ORDER BY ID DESC`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error("ProcesosRepo.obtenerProcesos =>", (error));
                throw error;
            }
        });
        this.crearProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('procesos', params, null);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error('ProcesosRepo.crearProceso => ', error);
                throw error;
            }
        });
        this.verificarSiHayProcesoAbierto = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID, NOMBRE FROM procesos WHERE ESTADO = 1`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('ProcesosRepo.verificarSiHayProcesoAbierto => ', error);
            }
        });
        this.cerrarProceso = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield (0, util_1.generarConsulta)('procesos', params, `ID = ${params.ID}`);
                const data = Object.values(params);
                const result = yield connection.promise().execute(query, data);
                return result;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`ProcesosRepo.cerrarProceso =>`, error);
                throw error;
            }
        });
    }
}
exports.ProcesosRepository = ProcesosRepository;

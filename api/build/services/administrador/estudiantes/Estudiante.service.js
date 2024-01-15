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
exports.EstudiantesService = void 0;
const connection_mysqldb_1 = __importDefault(require("../../../config/connection.mysqldb"));
const estudiantes_repository_1 = require("../../../repository/administrador/estudiantes/estudiantes.repository");
class EstudiantesService {
    constructor() {
        this.obtenerEstudiantes = () => __awaiter(this, void 0, void 0, function* () {
            const dbConnect = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.obtenerEstudiantes(dbConnect);
                return result;
            }
            catch (error) {
                yield dbConnect.rollback();
            }
            finally {
                yield dbConnect.close();
            }
        });
        this.buscarCarreraPorFacultad = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const result = yield this.estudianteRepo.buscarEstudiante(dbConex, params);
                return result;
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.modificarEstudiante = (params) => __awaiter(this, void 0, void 0, function* () {
            const dbConex = yield connection_mysqldb_1.default.connectMysql();
            try {
                const [result] = yield this.estudianteRepo.modificarEstudiante(dbConex, params);
                if (result.affectedRows > 0)
                    return { ok: true, message: 'Se modifico correctamente' };
                return { ok: false, message: 'No se pudo modificar' };
            }
            catch (error) {
                yield dbConex.rollback();
            }
            finally {
                yield dbConex.close();
            }
        });
        this.estudianteRepo = new estudiantes_repository_1.EstudianteRepository();
    }
}
exports.EstudiantesService = EstudiantesService;

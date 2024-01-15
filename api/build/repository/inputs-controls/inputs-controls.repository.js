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
exports.InputsControlsRepository = void 0;
const manager_log_resource_1 = require("../../resources/manager-log.resource");
class InputsControlsRepository {
    constructor() {
        this.obtenerProcesos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, NOMBRE as label FROM procesos ORDER BY id DESC`;
                // const query = `SELECT ID, NOMBRE, FECHA_REGISTRO, ESTADO FROM procesos ORDER BY id DESC`;
                const [rows, fields] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`InputsControlsRepository.obtenerProcesos => ${error}`);
                throw error;
            }
        });
        this.obtenerCarreras = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, ESCUELA_COMPLETA as label FROM carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`);
                throw error;
            }
        });
        this.obtenerCarrerasPorCodigoCarrera = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT CODIGO_ESCUELA as value, ESCUELA_COMPLETA as label FROM carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error(`InputsControlsRepository.obtenerCarreras => ${error}`);
                throw error;
            }
        });
        this.obtenerFacultades = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select DISTINCT(FACULTAD), FACULTAD as value, FACULTAD as label from carreras`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerFacultades => ', error);
                throw error;
            }
        });
        this.obtenerDiscapadidades = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, DISCAPACIDAD AS label FROM discapacidades`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerRazasEtnicas = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, ETNICA AS label FROM etnicas`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerProcesoActivo = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID as value, NOMBRE as label FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = '${params.TIPO_PROCESO}'`;
                console.log(query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputsControlsRepository.obtenerDiscapacidades => ', error);
                throw error;
            }
        });
        this.obtenerUbicacionAutocomplete = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT * FROM ubicaciones`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
            }
        });
        this.obtenerDepartamentos = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTINCT(DEPARTAMENTO), DEPARTAMENTO AS label , DEPARTAMENTO AS value  FROM ubicaciones;`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
            }
        });
        this.obtenerProvincias = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTINCT(PROVINCIA), PROVINCIA AS label , PROVINCIA AS value FROM ubicaciones WHERE DEPARTAMENTO = '${params.DEPARTAMENTO}';`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
            }
        });
        this.obtenerDistritos = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT DISTINCT(DISTRITO), DISTRITO AS label , DISTRITO AS value FROM ubicaciones WHERE PROVINCIA = '${params.PROVINCIA}';`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerUbicacionAutocomplete => ', error);
            }
        });
        this.buscarAulaPorTurno = (connection, params) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID AS value, NOMBRE_AULA AS label FROM aulas WHERE ID_PROCESO = (SELECT ID FROM procesos WHERE ESTADO = 1 AND TIPO_PROCESO = 'C' ) AND OCUPADO = 0 AND TURNO = '${params.TURNO}'`;
                console.log(query);
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.buscarAulaPorTurno => ', error);
            }
        });
        this.obtenerProcesosAbiertos = (connection) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT ID, TIPO_PROCESO, ESTADO   FROM procesos WHERE ESTADO = 1`;
                const [rows] = yield connection.promise().query(query);
                return rows;
            }
            catch (error) {
                manager_log_resource_1.logger.error('InputControlRepository.obtenerProcesosAbiertos => ', error);
            }
        });
    }
}
exports.InputsControlsRepository = InputsControlsRepository;

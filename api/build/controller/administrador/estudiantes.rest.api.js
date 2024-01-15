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
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Estudiante_service_1 = require("../../services/administrador/estudiantes/Estudiante.service");
class EstudianteController {
    constructor() {
        this.obtenerEstudiantes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.estudianteService.obtenerEstudiantes();
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.buscarEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.buscarCarreraPorFacultad(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.modificarEstudiante = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const resp = yield this.estudianteService.modificarEstudiante(params);
                res.status(200).json(resp);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.estudianteService = new Estudiante_service_1.EstudiantesService();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/obtener-estudiantes', (0, express_async_handler_1.default)(this.obtenerEstudiantes));
        this.router.post('/buscar-estudiante', (0, express_async_handler_1.default)(this.buscarEstudiante));
        this.router.put('/modificar-estudiante', (0, express_async_handler_1.default)(this.modificarEstudiante));
    }
}
exports.default = EstudianteController;

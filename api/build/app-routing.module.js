"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
// Modulos Externos
const express_1 = __importDefault(require("express"));
// Routes
const administrador_routing_1 = __importDefault(require("./controller/administrador/administrador.routing"));
class ApiRoutes {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
    }
    routes() {
        this.app.use('/administrador', administrador_routing_1.default);
        // this.app.use('/seguridad', seguridadRouting);
    }
}
exports.ApiRoutes = ApiRoutes;

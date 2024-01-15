"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoutes = void 0;
// Modulos Externos
const express_1 = __importDefault(require("express"));
const express_bearer_token_1 = __importDefault(require("express-bearer-token"));
// Routes
const administrador_routing_1 = __importDefault(require("./controller/administrador/administrador.routing"));
const inputs_controls_routing_1 = __importDefault(require("./controller/input-controls/inputs-controls.routing"));
const sistema_routing_1 = __importDefault(require("./controller/sistema/sistema.routing"));
const general_routing_1 = __importDefault(require("./controller/general/general.routing"));
class ApiRoutes {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, express_bearer_token_1.default)());
        this.routes();
    }
    routes() {
        this.app.use('/administrador', administrador_routing_1.default);
        this.app.use('/input-controls', inputs_controls_routing_1.default);
        this.app.use('/sistema', sistema_routing_1.default);
        this.app.use('/general', general_routing_1.default);
    }
}
exports.ApiRoutes = ApiRoutes;

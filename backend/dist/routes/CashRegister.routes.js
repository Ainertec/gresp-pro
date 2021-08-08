"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashRegisterRoutes = void 0;
const celebrate_1 = require("celebrate");
const CashRegisterController_1 = __importDefault(require("../controllers/CashRegisterController"));
class CashRegisterRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/cashregister', CashRegisterController_1.default.show);
        this.routes.post('/cashregister', celebrate_1.celebrate({ body: validations.cashRegister }), CashRegisterController_1.default.store);
        this.routes.put('/cashregisterexits/:id', celebrate_1.celebrate({
            body: validations.cashRegister,
            params: validations.paramIdCashRegister,
        }), CashRegisterController_1.default.updateExits);
        this.routes.put('/cashregisterclosure/:id', celebrate_1.celebrate({
            body: validations.cashRegister,
            params: validations.paramIdCashRegister,
        }), CashRegisterController_1.default.updateClosure);
        this.routes.delete('/cashregister', CashRegisterController_1.default.delete);
    }
}
exports.CashRegisterRoutes = CashRegisterRoutes;
//# sourceMappingURL=CashRegister.routes.js.map
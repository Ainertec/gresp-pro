"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const celebrate_1 = require("celebrate");
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
class OrderRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/orders', OrderController_1.default.index);
        this.routes.get('/orders/:identification', celebrate_1.celebrate({ params: validations.paramIdentification }), OrderController_1.default.show);
        this.routes.post('/orders', celebrate_1.celebrate({ body: validations.order }), OrderController_1.default.create);
        this.routes.put('/orders/:identification', celebrate_1.celebrate({
            body: validations.orderUpdate,
            params: validations.paramIdentification,
        }), OrderController_1.default.update);
        this.routes.delete('/orders/:identification/:payment/:paymentTip', celebrate_1.celebrate({ params: validations.paramIdentPayment }), OrderController_1.default.delete);
        this.routes.delete('/orderone/:id', celebrate_1.celebrate({ params: validations.orderDelete }), OrderController_1.default.deleteOne);
    }
}
exports.OrderRoutes = OrderRoutes;
//# sourceMappingURL=Order.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitchenRoutes = void 0;
const celebrate_1 = require("celebrate");
const KitchenController_1 = __importDefault(require("../controllers/KitchenController"));
class KitchenRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.post('/kitchen', celebrate_1.celebrate({ body: validations.kitchen }), KitchenController_1.default.store);
        this.routes.get('/kitchen', KitchenController_1.default.index);
    }
}
exports.KitchenRoutes = KitchenRoutes;
//# sourceMappingURL=Kitchen.routes.js.map
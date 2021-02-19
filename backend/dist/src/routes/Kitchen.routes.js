"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitchenRoutes = void 0;
var celebrate_1 = require("celebrate");
var KitchenController_1 = __importDefault(require("../controllers/KitchenController"));
var KitchenRoutes = /** @class */ (function () {
    function KitchenRoutes(routes) {
        this.routes = routes;
    }
    KitchenRoutes.prototype.getRoutes = function (validations) {
        this.routes.post('/kitchen', celebrate_1.celebrate({ body: validations.kitchen }), KitchenController_1.default.store);
        this.routes.get('/kitchen', KitchenController_1.default.index);
    };
    return KitchenRoutes;
}());
exports.KitchenRoutes = KitchenRoutes;

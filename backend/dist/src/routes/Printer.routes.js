"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrinterRoutes = void 0;
var celebrate_1 = require("celebrate");
var PrinterController_1 = __importDefault(require("../controllers/PrinterController"));
var PrinterRoutes = /** @class */ (function () {
    function PrinterRoutes(routes) {
        this.routes = routes;
    }
    PrinterRoutes.prototype.getRoutes = function (validations) {
        this.routes.post('/printer', celebrate_1.celebrate({ body: validations.printer }), PrinterController_1.default.create);
        this.routes.get('/printer/products', PrinterController_1.default.show);
        this.routes.get('/printer/orders', PrinterController_1.default.index);
    };
    return PrinterRoutes;
}());
exports.PrinterRoutes = PrinterRoutes;

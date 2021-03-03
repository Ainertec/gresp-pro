"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrinterRoutes = void 0;
const celebrate_1 = require("celebrate");
const PrinterController_1 = __importDefault(require("../controllers/PrinterController"));
class PrinterRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.post('/printer', celebrate_1.celebrate({ body: validations.printer }), PrinterController_1.default.create);
        this.routes.post('/printer/comprovant', celebrate_1.celebrate({ body: validations.printerComprovant }), PrinterController_1.default.createComprovant);
        this.routes.get('/printer/products', PrinterController_1.default.show);
        this.routes.get('/printer/orders', PrinterController_1.default.index);
    }
}
exports.PrinterRoutes = PrinterRoutes;
//# sourceMappingURL=Printer.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const celebrate_1 = require("celebrate");
const ReportController_1 = __importDefault(require("../controllers/ReportController"));
class ReportRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.delete('/reports', ReportController_1.default.delete);
        this.routes.delete('/reports/:id', celebrate_1.celebrate({ params: validations.reportDelete }), ReportController_1.default.deleteOne);
        this.routes.get('/reports', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.show);
        this.routes.get('/reports/total', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.showTotal);
        this.routes.get('/reports/products', ReportController_1.default.totalSoldProducts);
        this.routes.get('/reports/productsmes', ReportController_1.default.totalSoldProductsMes);
        this.routes.get('/reports/orders', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.showClosedOrders);
        this.routes.get('/reports/coststock', ReportController_1.default.costStock);
    }
}
exports.ReportRoutes = ReportRoutes;
//# sourceMappingURL=Report.routes.js.map
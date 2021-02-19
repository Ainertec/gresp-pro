"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
var celebrate_1 = require("celebrate");
var ReportController_1 = __importDefault(require("../controllers/ReportController"));
var ReportRoutes = /** @class */ (function () {
    function ReportRoutes(routes) {
        this.routes = routes;
    }
    ReportRoutes.prototype.getRoutes = function (validations) {
        this.routes.delete('/reports', ReportController_1.default.delete);
        this.routes.delete('/reportsone/:id', celebrate_1.celebrate({ params: validations.reportDelete }), ReportController_1.default.deleteOne);
        this.routes.get('/reports', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.show);
        this.routes.get('/reports/total', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.showTotal);
        this.routes.get('/reports/products', ReportController_1.default.totalSoldProducts);
        this.routes.get('/reports/productsmes', ReportController_1.default.totalSoldProductsMes);
        this.routes.get('/reports/orders', celebrate_1.celebrate({ query: validations.report }), ReportController_1.default.showClosedOrders);
        this.routes.get('/reports/coststock', ReportController_1.default.costStock);
    };
    return ReportRoutes;
}());
exports.ReportRoutes = ReportRoutes;

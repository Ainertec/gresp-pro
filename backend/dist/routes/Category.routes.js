"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const celebrate_1 = require("celebrate");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
class CategoryRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/categories', CategoryController_1.default.index);
        this.routes.get('/categories/:id', celebrate_1.celebrate({ params: validations.paramIdCategory }), CategoryController_1.default.show);
        this.routes.post('/categories', celebrate_1.celebrate({ body: validations.category }), CategoryController_1.default.store);
        this.routes.put('/categories/:id', celebrate_1.celebrate({
            body: validations.category,
            params: validations.paramIdCategory,
        }), CategoryController_1.default.update);
        this.routes.delete('/categories/:id', celebrate_1.celebrate({ params: validations.paramIdCategory }), CategoryController_1.default.delete);
    }
}
exports.CategoryRoutes = CategoryRoutes;
//# sourceMappingURL=Category.routes.js.map
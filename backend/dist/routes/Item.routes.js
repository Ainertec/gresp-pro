"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRoutes = void 0;
const celebrate_1 = require("celebrate");
const ItemController_1 = __importDefault(require("../controllers/ItemController"));
class ItemRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.get('/items/:name', celebrate_1.celebrate({
            params: validations.paramNameItem,
            query: validations.queryPage,
        }), ItemController_1.default.show);
        this.routes.get('/itemsDesk/:name', celebrate_1.celebrate({
            params: validations.paramNameItem,
            query: validations.queryPage,
        }), ItemController_1.default.showDesk);
        this.routes.get('/items', ItemController_1.default.index);
        this.routes.get('/itemsDesk', ItemController_1.default.indexDesk);
        this.routes.post('/items', celebrate_1.celebrate({ body: validations.item }), ItemController_1.default.create);
        this.routes.put('/items/:id', celebrate_1.celebrate({ body: validations.item, params: validations.paramIdItem }), ItemController_1.default.update);
        this.routes.delete('/items/:id', celebrate_1.celebrate({ params: validations.paramIdItem }), ItemController_1.default.delete);
    }
}
exports.ItemRoutes = ItemRoutes;
//# sourceMappingURL=Item.routes.js.map
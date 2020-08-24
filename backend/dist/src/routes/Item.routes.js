"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRoutes = void 0;
var celebrate_1 = require("celebrate");
var ItemController_1 = __importDefault(require("../controllers/ItemController"));
var ItemRoutes = /** @class */ (function () {
    function ItemRoutes(routes) {
        this.routes = routes;
    }
    ItemRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/items/:name', celebrate_1.celebrate({
            params: validations.paramNameItem,
            query: validations.queryPage,
        }), ItemController_1.default.show);
        this.routes.get('/items', ItemController_1.default.index);
        this.routes.post('/items', celebrate_1.celebrate({ body: validations.item }), ItemController_1.default.create);
        this.routes.put('/items/:id', celebrate_1.celebrate({ body: validations.item, params: validations.paramIdItem }), ItemController_1.default.update);
        this.routes.delete('/items/:id', celebrate_1.celebrate({ params: validations.paramIdItem }), ItemController_1.default.delete);
    };
    return ItemRoutes;
}());
exports.ItemRoutes = ItemRoutes;

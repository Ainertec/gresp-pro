"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var celebrate_1 = require("celebrate");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var UserRoutes = /** @class */ (function () {
    function UserRoutes(routes) {
        this.routes = routes;
    }
    UserRoutes.prototype.getRoutes = function (validations) {
        this.routes.get('/users', UserController_1.default.index);
        this.routes.get('/users/:name', celebrate_1.celebrate({ params: validations.paramName }), UserController_1.default.show);
        this.routes.post('/users', celebrate_1.celebrate({ body: validations.user }), UserController_1.default.create);
        this.routes.put('/users/:id', celebrate_1.celebrate({
            params: validations.paramIdUser,
            body: validations.userUpdate,
        }), UserController_1.default.update);
        this.routes.delete('/users/:id', celebrate_1.celebrate({ params: validations.paramIdUser }), UserController_1.default.delete);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = void 0;
var celebrate_1 = require("celebrate");
var ForgotPasswordController_1 = __importDefault(require("../controllers/ForgotPasswordController"));
var UserController_1 = __importDefault(require("../controllers/UserController"));
var SessionController_1 = __importDefault(require("../controllers/SessionController"));
var SessionRoutes = /** @class */ (function () {
    function SessionRoutes(routes) {
        this.routes = routes;
    }
    SessionRoutes.prototype.getRoutes = function (validations) {
        this.routes.post('/sessions', celebrate_1.celebrate({ body: validations.session }), SessionController_1.default.create);
        this.routes.get('/forgot', celebrate_1.celebrate({ query: validations.forgotGet }), ForgotPasswordController_1.default.show);
        this.routes.post('/forgot', celebrate_1.celebrate({ body: validations.forgot }), ForgotPasswordController_1.default.store);
        this.routes.get('/users/questions', UserController_1.default.getQuestions);
    };
    return SessionRoutes;
}());
exports.SessionRoutes = SessionRoutes;

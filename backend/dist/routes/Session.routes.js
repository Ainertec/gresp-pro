"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRoutes = void 0;
const celebrate_1 = require("celebrate");
const ForgotPasswordController_1 = __importDefault(require("../controllers/ForgotPasswordController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const SessionController_1 = __importDefault(require("../controllers/SessionController"));
class SessionRoutes {
    constructor(routes) {
        this.routes = routes;
    }
    getRoutes(validations) {
        this.routes.post('/sessions', celebrate_1.celebrate({ body: validations.session }), SessionController_1.default.create);
        this.routes.get('/forgot', celebrate_1.celebrate({ query: validations.forgotGet }), ForgotPasswordController_1.default.show);
        this.routes.post('/forgot', celebrate_1.celebrate({ body: validations.forgot }), ForgotPasswordController_1.default.store);
        this.routes.get('/users/questions', UserController_1.default.getQuestions);
    }
}
exports.SessionRoutes = SessionRoutes;
//# sourceMappingURL=Session.routes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class SessionController {
    async create(request, response) {
        const { name, password } = request.body;
        const user = await User_1.default.findOne({ name });
        if (!user) {
            return response.status(401).json('user does not exist');
        }
        const correctPassword = await user.checkPassword(password);
        if (!correctPassword) {
            return response.status(401).json('incorrect password');
        }
        const token = user.generateToken();
        const serializedUser = Object.assign(Object.assign({}, user.toObject()), { password_hash: undefined, response: undefined });
        return response.json({
            user: serializedUser,
            token,
        });
    }
}
exports.default = new SessionController();
//# sourceMappingURL=SessionController.js.map
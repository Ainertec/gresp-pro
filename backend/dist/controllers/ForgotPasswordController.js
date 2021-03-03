"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class ForgotPasswordController {
    async show(req, res) {
        const { name } = req.query;
        const user = await User_1.default.findOne({ name: String(name) });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        return res.status(200).json({ question: user.question });
    }
    async store(req, res) {
        const { name, response, password } = req.body;
        const user = await User_1.default.findOne({ name });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }
        if (response !== user.response) {
            return res.status(401).json({ message: 'Incorret response' });
        }
        user.password = password;
        await user.save();
        return res.status(200).send();
    }
}
exports.default = new ForgotPasswordController();
//# sourceMappingURL=ForgotPasswordController.js.map
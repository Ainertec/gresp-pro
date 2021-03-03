"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importStar(require("../models/User"));
class UserController {
    async getQuestions(req, res) {
        const questions = User_1.Questions.getQuestions();
        return res.json(questions);
    }
    async index(req, res) {
        const users = await User_1.default.find();
        const serializedUsers = users.map(user => {
            return Object.assign(Object.assign({}, user.toObject()), { password_hash: undefined });
        });
        return res.json(serializedUsers);
    }
    async show(req, res) {
        const { name } = req.params;
        const users = await User_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
        const serializedUser = users.map(user => {
            return Object.assign(Object.assign({}, user.toObject()), { password_hash: undefined });
        });
        return res.json(serializedUser);
    }
    async create(req, res) {
        const { admin, name, question, password, response } = req.body;
        const { userId } = req;
        const isValidQuestion = User_1.Questions.getQuestions().includes(question);
        if (!isValidQuestion) {
            return res.status(400).json({ message: 'invalid question' });
        }
        const authUser = await User_1.default.findOne({ _id: userId });
        const existUserName = await User_1.default.findOne({ name });
        if (existUserName) {
            return res.status(400).json('name already exist');
        }
        const user = await User_1.default.create({
            name,
            password,
            question,
            response,
            admin: (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? admin : false,
        });
        return res.json(user);
    }
    async store(req, res) {
        const { question, name, password, response, admin } = req.body;
        // const userId = req.userId;
        const isValidQuestion = User_1.Questions.getQuestions().includes(question);
        if (!isValidQuestion) {
            return res.status(400).json({ message: 'invalid question' });
        }
        // const authUser = await User.findOne({ _id: userId });
        const existUserName = await User_1.default.findOne({ name });
        if (existUserName) {
            return res.status(400).json('name already exist');
        }
        const user = await User_1.default.create({
            name,
            password,
            question,
            response,
            admin,
        });
        return res.json(user);
    }
    async update(req, res) {
        const { question, name, password, response, admin } = req.body;
        const { id } = req.params;
        const { userId } = req;
        const isValidQuestion = User_1.Questions.getQuestions().includes(question);
        if (!isValidQuestion) {
            return res.status(400).json({ message: 'invalid question' });
        }
        if (name) {
            const nameAlreadyExist = await User_1.default.findOne({ name });
            if (nameAlreadyExist) {
                return res.status(400).json('The name already been used');
            }
        }
        const authUser = await User_1.default.findOne({ _id: userId });
        if ((authUser === null || authUser === void 0 ? void 0 : authUser.admin) || userId === id) {
            const user = await User_1.default.findOneAndUpdate({ _id: id }, {
                question,
                response,
                admin: (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? admin : false,
            }, {
                new: true,
            });
            if (name && user) {
                user.name = name;
            }
            if (password && user) {
                user.password = password;
            }
            if (user)
                await user.save();
            return res.json(user);
        }
        return res.status(401).json({ message: 'You do not have permission' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await User_1.default.deleteOne({ _id: id });
        return res.status(200).send();
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map
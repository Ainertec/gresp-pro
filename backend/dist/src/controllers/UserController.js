"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var User_2 = require("../models/User");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getQuestions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var questions;
            return __generator(this, function (_a) {
                questions = User_2.Questions.getQuestions();
                return [2 /*return*/, res.json(questions)];
            });
        });
    };
    UserController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, serializadedUsers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.find()];
                    case 1:
                        users = _a.sent();
                        serializadedUsers = users.map(function (user) {
                            return __assign(__assign({}, user.toObject()), { password_hash: undefined });
                        });
                        return [2 /*return*/, res.json(serializadedUsers)];
                }
            });
        });
    };
    UserController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, users, serializadedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = req.params.name;
                        return [4 /*yield*/, User_1.default.find({ name: { $regex: new RegExp(name), $options: 'i' } })];
                    case 1:
                        users = _a.sent();
                        serializadedUser = users.map(function (user) {
                            return __assign(__assign({}, user.toObject()), { password_hash: undefined });
                        });
                        return [2 /*return*/, res.json(serializadedUser)];
                }
            });
        });
    };
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, admin, name, question, password, response, userId, isValidQuestion, authUser, existUserName, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, admin = _a.admin, name = _a.name, question = _a.question, password = _a.password, response = _a.response;
                        userId = req.userId;
                        isValidQuestion = User_2.Questions.getQuestions().includes(question);
                        if (!isValidQuestion) {
                            return [2 /*return*/, res.status(400).json({ message: 'invalid question' })];
                        }
                        return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 1:
                        authUser = _b.sent();
                        return [4 /*yield*/, User_1.default.findOne({ name: name })];
                    case 2:
                        existUserName = _b.sent();
                        if (existUserName) {
                            return [2 /*return*/, res.status(400).json('name already exist')];
                        }
                        return [4 /*yield*/, User_1.default.create({
                                name: name,
                                password: password,
                                question: question,
                                response: response,
                                admin: (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? admin : false,
                            })];
                    case 3:
                        user = _b.sent();
                        return [2 /*return*/, res.json(user)];
                }
            });
        });
    };
    UserController.prototype.store = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, question, name, password, response, admin, isValidQuestion, existUserName, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, question = _a.question, name = _a.name, password = _a.password, response = _a.response, admin = _a.admin;
                        isValidQuestion = User_2.Questions.getQuestions().includes(question);
                        if (!isValidQuestion) {
                            return [2 /*return*/, res.status(400).json({ message: 'invalid question' })];
                        }
                        return [4 /*yield*/, User_1.default.findOne({ name: name })];
                    case 1:
                        existUserName = _b.sent();
                        if (existUserName) {
                            return [2 /*return*/, res.status(400).json('name already exist')];
                        }
                        return [4 /*yield*/, User_1.default.create({
                                name: name,
                                password: password,
                                question: question,
                                response: response,
                                admin: admin,
                            })];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, res.json(user)];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, question, name, password, response, admin, id, userId, isValidQuestion, nameAlreadyExist, authUser, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, question = _a.question, name = _a.name, password = _a.password, response = _a.response, admin = _a.admin;
                        id = req.params.id;
                        userId = req.userId;
                        isValidQuestion = User_2.Questions.getQuestions().includes(question);
                        if (!isValidQuestion) {
                            return [2 /*return*/, res.status(400).json({ message: 'invalid question' })];
                        }
                        if (!name) return [3 /*break*/, 2];
                        return [4 /*yield*/, User_1.default.findOne({ name: name })];
                    case 1:
                        nameAlreadyExist = _b.sent();
                        if (nameAlreadyExist) {
                            return [2 /*return*/, res.status(400).json('The name already been used')];
                        }
                        _b.label = 2;
                    case 2: return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 3:
                        authUser = _b.sent();
                        if (!((authUser === null || authUser === void 0 ? void 0 : authUser.admin) || userId === id)) return [3 /*break*/, 7];
                        return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: id }, {
                                question: question,
                                response: response,
                                admin: (authUser === null || authUser === void 0 ? void 0 : authUser.admin) ? admin : false,
                            }, {
                                new: true,
                            })];
                    case 4:
                        user = _b.sent();
                        if (name && user) {
                            user.name = name;
                        }
                        if (password && user) {
                            user.password = password;
                        }
                        if (!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, res.json(user)];
                    case 7: return [2 /*return*/, res.status(401).json({ message: 'You do not have permission' })];
                }
            });
        });
    };
    UserController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, User_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();

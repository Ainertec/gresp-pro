"use strict";
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
var Item_1 = __importDefault(require("../models/Item"));
var getItemsCost_1 = __importDefault(require("../utils/getItemsCost"));
var Category_1 = __importDefault(require("../models/Category"));
var ItemController = /** @class */ (function () {
    function ItemController() {
    }
    ItemController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, name, count, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query.page, page = _a === void 0 ? 1 : _a;
                        name = req.params.name;
                        return [4 /*yield*/, Item_1.default.find({
                                name: { $regex: new RegExp(name), $options: 'i' },
                            }).countDocuments({})];
                    case 1:
                        count = _b.sent();
                        return [4 /*yield*/, Item_1.default.find({
                                name: { $regex: new RegExp(name), $options: 'i' },
                            })
                                .skip((Number(page) - 1) * 10)
                                .limit(10)
                                .populate('ingredients.material')];
                    case 2:
                        items = _b.sent();
                        res.header('X-Total-Count', String(count));
                        return [2 /*return*/, res.json(items)];
                }
            });
        });
    };
    ItemController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, count, items;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query.page, page = _a === void 0 ? 1 : _a;
                        return [4 /*yield*/, Item_1.default.countDocuments({})];
                    case 1:
                        count = _b.sent();
                        return [4 /*yield*/, Item_1.default.find()
                                .skip((Number(page) - 1) * 10)
                                .limit(10)
                                .populate('ingredients.material')];
                    case 2:
                        items = _b.sent();
                        res.header('X-Total-Count', String(count));
                        return [2 /*return*/, res.json(items)];
                }
            });
        });
    };
    ItemController.prototype.showDesk = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = req.params.name;
                        return [4 /*yield*/, Item_1.default.find({
                                name: { $regex: new RegExp(name), $options: 'i' },
                            })
                                .populate('ingredients.material')];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, res.json(items)];
                }
            });
        });
    };
    ItemController.prototype.indexDesk = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Item_1.default.find()
                            .populate('ingredients.material')];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, res.json(items)];
                }
            });
        });
    };
    ItemController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, price, description, stock, drink, ingredients, cost, categoryId, available, itemCost, _b, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, name = _a.name, price = _a.price, description = _a.description, stock = _a.stock, drink = _a.drink, ingredients = _a.ingredients, cost = _a.cost, categoryId = _a.categoryId, available = _a.available;
                        if (!ingredients && !cost) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json('It is necessary to send an ingredients or a cost')];
                        }
                        if (!ingredients && !stock) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json('It is necessary to send an ingredients or a stock')];
                        }
                        if (!ingredients) return [3 /*break*/, 2];
                        return [4 /*yield*/, getItemsCost_1.default(ingredients)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = Number(cost);
                        _c.label = 3;
                    case 3:
                        itemCost = _b;
                        return [4 /*yield*/, Item_1.default.create({
                                name: name,
                                price: price,
                                description: description,
                                stock: ingredients ? undefined : stock,
                                drink: drink,
                                cost: Number(itemCost.toFixed(5)),
                                ingredients: ingredients || null,
                                available: available,
                            })];
                    case 4:
                        item = _c.sent();
                        if (!categoryId) return [3 /*break*/, 6];
                        return [4 /*yield*/, Category_1.default.findOneAndUpdate({ _id: categoryId }, { $addToSet: { products: item._id } })];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, item.populate('ingredients.material').execPopulate()];
                    case 7:
                        _c.sent();
                        return [2 /*return*/, res.json(item)];
                }
            });
        });
    };
    ItemController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, price, description, stock, drink, cost, ingredients, categoryId, available, id, itemCost, _b, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, name = _a.name, price = _a.price, description = _a.description, stock = _a.stock, drink = _a.drink, cost = _a.cost, ingredients = _a.ingredients, categoryId = _a.categoryId, available = _a.available;
                        id = req.params.id;
                        if (!ingredients && !cost) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json('It is necessary to send an ingredients or a cost')];
                        }
                        if (!ingredients && !stock) {
                            return [2 /*return*/, res
                                    .status(400)
                                    .json('It is necessary to send an ingredients or a stock')];
                        }
                        if (!ingredients) return [3 /*break*/, 2];
                        return [4 /*yield*/, getItemsCost_1.default(ingredients)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = Number(cost);
                        _c.label = 3;
                    case 3:
                        itemCost = _b;
                        return [4 /*yield*/, Item_1.default.findOneAndUpdate({ _id: id }, {
                                name: name,
                                price: price,
                                description: description,
                                stock: ingredients ? undefined : stock,
                                cost: Number(itemCost.toFixed(5)),
                                drink: !!drink,
                            }, {
                                new: true,
                            })];
                    case 4:
                        item = _c.sent();
                        if (!item)
                            return [2 /*return*/, res.status(400).json('Item does not exist')];
                        if (ingredients) {
                            item.ingredients = ingredients;
                        }
                        if (available !== undefined) {
                            item.available = available;
                        }
                        return [4 /*yield*/, item.save()];
                    case 5:
                        _c.sent();
                        if (!categoryId) return [3 /*break*/, 8];
                        return [4 /*yield*/, Category_1.default.findOneAndUpdate({ products: { $in: [item.id] } }, { $pull: { products: item.id } })];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, Category_1.default.findOneAndUpdate({ _id: categoryId }, { $addToSet: { products: item._id } })];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [4 /*yield*/, item.populate('ingredients.material').execPopulate()];
                    case 9:
                        _c.sent();
                        return [2 /*return*/, res.json(item)];
                }
            });
        });
    };
    ItemController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Item_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    return ItemController;
}());
exports.default = new ItemController();

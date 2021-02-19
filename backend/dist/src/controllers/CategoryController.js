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
var Category_1 = __importDefault(require("../models/Category"));
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Category_1.default.find({}).populate('products')];
                    case 1:
                        category = _a.sent();
                        return [2 /*return*/, response.json(category)];
                }
            });
        });
    };
    CategoryController.prototype.indexMenu = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, categoriesSerializer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Category_1.default.find({}).populate('products').lean()];
                    case 1:
                        categories = _a.sent();
                        categoriesSerializer = categories.map(function (category) {
                            return {
                                name: category.name,
                                color: category.color,
                                _id: category._id,
                                products: category.products.filter(function (product) { return product.available === true; }),
                            };
                        });
                        return [2 /*return*/, response.json(categoriesSerializer)];
                }
            });
        });
    };
    CategoryController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, category, categoryProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, Category_1.default.find({ _id: id }).populate('products')];
                    case 1:
                        category = _a.sent();
                        categoryProducts = category.map(function (categoryItem) {
                            return categoryItem.products;
                        });
                        return [2 /*return*/, response.json(categoryProducts[0])];
                }
            });
        });
    };
    CategoryController.prototype.store = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, products, color, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, products = _a.products, color = _a.color;
                        return [4 /*yield*/, Category_1.default.create({
                                name: name,
                                products: products,
                                color: color,
                            })];
                    case 1:
                        category = _b.sent();
                        return [4 /*yield*/, category.populate('products')];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.json(category)];
                }
            });
        });
    };
    CategoryController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, products, color, id, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, products = _a.products, color = _a.color;
                        id = request.params.id;
                        return [4 /*yield*/, Category_1.default.findByIdAndUpdate({ _id: id }, {
                                name: name,
                                products: products,
                                color: color,
                            }, { new: true })];
                    case 1:
                        category = _b.sent();
                        if (!category) {
                            return [2 /*return*/, response.status(400).json('That category does not exist')];
                        }
                        category.populate('products');
                        return [2 /*return*/, response.json(category)];
                }
            });
        });
    };
    CategoryController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, Category_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.status(200).send()];
                }
            });
        });
    };
    return CategoryController;
}());
exports.default = new CategoryController();

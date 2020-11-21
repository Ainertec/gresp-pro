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
var date_fns_1 = require("date-fns");
var Order_1 = __importDefault(require("../models/Order"));
var Item_1 = __importDefault(require("../models/Item"));
var OrderProfitUseCase_1 = require("../UseCases/Report/OrderProfitUseCase");
var SoldsProductsTotalUseCase_1 = require("../UseCases/Report/SoldsProductsTotalUseCase");
var ReportController = /** @class */ (function () {
    function ReportController() {
    }
    ReportController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var initial, final, orderProfitUseCase, orders, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = String(req.query.initial);
                        final = String(req.query.final);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        orderProfitUseCase = new OrderProfitUseCase_1.OrdersProfitUseCase(Order_1.default);
                        return [4 /*yield*/, orderProfitUseCase.execute(initial, final)];
                    case 2:
                        orders = _a.sent();
                        return [2 /*return*/, res.json(orders)];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json(error_1.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ReportController.prototype.costStock = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var item, costTotalStock, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Item_1.default.find()];
                    case 1:
                        item = _a.sent();
                        costTotalStock = item.reduce(function (sum, element) {
                            return sum + element.cost * (element.stock ? element.stock : 0);
                        }, 0);
                        return [2 /*return*/, res.json(costTotalStock)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json(error_2.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReportController.prototype.showTotal = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var initial, final, initialDate, finalDate, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = String(req.query.initial);
                        final = String(req.query.final);
                        initialDate = date_fns_1.parseISO(initial);
                        finalDate = date_fns_1.parseISO(final);
                        if (!date_fns_1.isValid(initialDate) && !date_fns_1.isValid(finalDate))
                            return [2 /*return*/, res.status(400).json({ message: 'invalid date' })];
                        return [4 /*yield*/, Order_1.default.aggregate()
                                .match({
                                createdAt: { $gte: initialDate, $lte: finalDate },
                                closed: true,
                            })
                                .group({
                                _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
                                total: { $sum: 1 },
                            })
                                .sort({ amount: -1 })];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, res.json(orders)];
                }
            });
        });
    };
    ReportController.prototype.showClosedOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var initial, final, initialDate, finalDate, orders, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initial = String(req.query.initial);
                        final = String(req.query.final);
                        initialDate = date_fns_1.parseISO(initial);
                        finalDate = date_fns_1.parseISO(final);
                        if (!date_fns_1.isValid(initialDate) && !date_fns_1.isValid(finalDate))
                            return [2 /*return*/, res.status(400).json({ message: 'invalid date' })];
                        return [4 /*yield*/, Order_1.default.find({
                                createdAt: { $gte: initialDate, $lte: finalDate },
                                closed: true,
                            }).populate('items.product')];
                    case 1:
                        orders = _a.sent();
                        result = orders.map(function (order) {
                            var costTotal = 0;
                            order.items.forEach(function (element) {
                                costTotal += element.product.cost * element.quantity;
                            });
                            return {
                                order: order,
                                costTotal: costTotal
                            };
                        });
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    ReportController.prototype.totalSoldProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var soldsProductsUseCase, products, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        soldsProductsUseCase = new SoldsProductsTotalUseCase_1.SoldsProductsTotalUseCase(Order_1.default);
                        return [4 /*yield*/, soldsProductsUseCase.execute()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.json(products)];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json(error_3.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReportController.prototype.totalSoldProductsMes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var soldsProductsUseCase, products, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        soldsProductsUseCase = new SoldsProductsTotalUseCase_1.SoldsProductsTotalUseCase(Order_1.default);
                        return [4 /*yield*/, soldsProductsUseCase.executeMes()];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, res.json(products)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json(error_4.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReportController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = date_fns_1.sub(new Date(), { years: 5 });
                        return [4 /*yield*/, Order_1.default.deleteMany({
                                createdAt: { $lte: date },
                                closed: true,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    ReportController.prototype.deleteOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Order_1.default.deleteOne({ _id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                }
            });
        });
    };
    return ReportController;
}());
exports.default = new ReportController();

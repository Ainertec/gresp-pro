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
var Order_1 = __importDefault(require("../models/Order"));
var Item_1 = __importDefault(require("../models/Item"));
var OrderController = /** @class */ (function () {
    function OrderController() {
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }
    OrderController.prototype.getOrderTotalAndAlert = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var total, alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        total = 0;
                        alert = Array();
                        return [4 /*yield*/, Promise.all(items.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var consumedItem;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Item_1.default.findOne({ _id: item.product }).populate('ingredients.material')];
                                        case 1:
                                            consumedItem = _a.sent();
                                            if (consumedItem) {
                                                if (consumedItem.stock && consumedItem.stock <= 10)
                                                    alert.push(consumedItem.name);
                                                if (consumedItem.ingredients) {
                                                    consumedItem.ingredients.map(function (ingredient) {
                                                        if (ingredient.material.stock <= 10) {
                                                            alert.push(consumedItem.name);
                                                        }
                                                    });
                                                }
                                                total += item.courtesy ? 0 : consumedItem.price * item.quantity;
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { total: total, alert: alert }];
                }
            });
        });
    };
    OrderController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, identification, items, note, orderInformations, finalPrice, order;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, identification = _a.identification, items = _a.items, note = _a.note;
                        return [4 /*yield*/, Order_1.default.findOne({ identification: identification, closed: false })];
                    case 1:
                        if (_b.sent())
                            return [2 /*return*/, res.status(400).json('Order already exist')];
                        return [4 /*yield*/, this.getOrderTotalAndAlert(items)];
                    case 2:
                        orderInformations = _b.sent();
                        finalPrice = orderInformations.total;
                        return [4 /*yield*/, Order_1.default.create({
                                identification: identification,
                                items: items,
                                total: Number(finalPrice.toFixed(2)),
                                note: note,
                                finished: false,
                            })];
                    case 3:
                        order = _b.sent();
                        return [4 /*yield*/, order.populate('items.product').execPopulate()];
                    case 4:
                        _b.sent();
                        req.io.emit('newOrder', order);
                        return [2 /*return*/, res.json({
                                order: order,
                                stockAlert: orderInformations.alert.length === 0
                                    ? undefined
                                    : orderInformations.alert,
                            })];
                }
            });
        });
    };
    OrderController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, items, note, identification, orderInformations, finalPrice, order, newOrder;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, items = _a.items, note = _a.note;
                        identification = Number(req.params.identification);
                        return [4 /*yield*/, this.getOrderTotalAndAlert(items)];
                    case 1:
                        orderInformations = _b.sent();
                        finalPrice = orderInformations.total;
                        return [4 /*yield*/, Order_1.default.findOneAndUpdate({ identification: identification, closed: false }, {
                                identification: identification,
                                items: items,
                                total: Number(finalPrice.toFixed(2)),
                                note: note,
                            }, {
                                new: false,
                            })];
                    case 2:
                        order = _b.sent();
                        return [4 /*yield*/, Order_1.default.findOne({
                                identification: identification,
                                closed: false,
                            }).populate('items.product')];
                    case 3:
                        newOrder = _b.sent();
                        if (!order)
                            return [2 /*return*/, res.status(400).json('identification does not exist')];
                        // await order.populate('items.product').execPopulate();
                        req.io.emit('updatedOrder', newOrder);
                        return [2 /*return*/, res.json({
                                order: newOrder,
                                oldItems: order.items,
                                stockAlert: orderInformations.alert.length === 0
                                    ? undefined
                                    : orderInformations.alert,
                            })];
                }
            });
        });
    };
    OrderController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var identification, payment, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        identification = Number(req.params.identification);
                        payment = req.params.payment;
                        return [4 /*yield*/, Order_1.default.findOneAndUpdate({ identification: identification, closed: false }, { closed: true, payment: payment }, { new: true })];
                    case 1:
                        order = _a.sent();
                        req.io.emit('payment', order);
                        return [2 /*return*/, res.json('Order was closed with success!')];
                }
            });
        });
    };
    OrderController.prototype.deleteOne = function (req, res) {
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
    OrderController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Order_1.default.find({ closed: false }).populate('items.product')];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, res.json(orders)];
                }
            });
        });
    };
    OrderController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var identification, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        identification = Number(req.params.identification);
                        return [4 /*yield*/, Order_1.default.findOne({
                                identification: identification,
                                closed: false,
                            }).populate('items.product')];
                    case 1:
                        order = _a.sent();
                        return [2 /*return*/, res.json(order)];
                }
            });
        });
    };
    return OrderController;
}());
exports.default = new OrderController();

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
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../src/app"));
var connection_1 = require("../utils/connection");
var factories_1 = __importDefault(require("../factories"));
var Order_1 = __importDefault(require("../../src/models/Order"));
var getToken_1 = __importDefault(require("../utils/getToken"));
var Item_1 = __importDefault(require("../../src/models/Item"));
var app = app_1.default.express;
describe('Order Controller', function () {
    beforeAll(function () {
        connection_1.openConnection();
    });
    afterAll(function () {
        connection_1.closeConnection();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order_1.default.deleteMany({})];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Item_1.default.deleteMany({})];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, item, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item', {
                            stock: 5,
                        })];
                case 2:
                    item = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/orders')
                            .send({
                            identification: 123,
                            note: 'Ola',
                            items: [
                                {
                                    product: item._id,
                                    quantity: 4,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + token)];
                case 3:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('stockAlert');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a order with courtesy products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, item, item2, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item', {
                            stock: 5,
                            price: 2,
                        })];
                case 2:
                    item = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item', {
                            stock: 51,
                            price: 4,
                        })];
                case 3:
                    item2 = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/orders')
                            .send({
                            identification: 123,
                            note: 'Ola',
                            items: [
                                {
                                    product: item._id,
                                    quantity: 4,
                                    courtesy: true,
                                },
                                {
                                    product: item2._id,
                                    quantity: 4,
                                    courtesy: false,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    expect(response.body.order.total).toBe(16);
                    expect(response.body).toHaveProperty('stockAlert');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a order with already existent identification', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, item, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item')];
                case 2:
                    item = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: 123,
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .post('/orders')
                            .send({
                            identification: 123,
                            note: 'Ola',
                            items: [
                                {
                                    product: item._id,
                                    quantity: 5,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, order, item, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: 123,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item', {
                            stock: 5,
                        })];
                case 3:
                    item = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .put("/orders/" + order.identification)
                            .send({
                            note: 'Ola',
                            items: [
                                {
                                    product: item._id,
                                    quantity: 5,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    expect(response.body).toHaveProperty('stockAlert');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a order with courtesy product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, order, item, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: 123,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item', {
                            stock: 5,
                        })];
                case 3:
                    item = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .put("/orders/" + order.identification)
                            .send({
                            note: 'Ola',
                            items: [
                                {
                                    product: item._id,
                                    quantity: 5,
                                    courtesy: true,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    expect(response.body.order.total).toBe(0);
                    expect(response.body).toHaveProperty('stockAlert');
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update an order with invalid identification', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, item, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: 123,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Item', {
                            stock: 5,
                        })];
                case 3:
                    item = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .put("/orders/234234")
                            .send({
                            note: 'Ola',
                            items: [
                                {
                                    product: item._id,
                                    quantity: 5,
                                },
                            ],
                        })
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should close an order ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: 123,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .delete("/orders/" + order.identification + "/dinheiro")
                            .set('Authorization', "Bearer " + token)];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list all open orders ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.createMany('Order', 5)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .get("/orders")
                            .set('Authorization', "Bearer " + token)];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBe(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should list an open orders by identification ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, order, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getToken_1.default];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, factories_1.default.create('Order', {
                            identification: 123,
                        })];
                case 2:
                    order = _a.sent();
                    return [4 /*yield*/, supertest_1.default(app)
                            .get("/orders/" + order.identification)
                            .set('Authorization', "Bearer " + token)];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});

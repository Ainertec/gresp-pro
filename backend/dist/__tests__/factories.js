"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_girl_1 = __importDefault(require("factory-girl"));
var faker_1 = __importDefault(require("faker"));
var User_1 = __importDefault(require("../src/models/User"));
var Item_1 = __importDefault(require("../src/models/Item"));
var Order_1 = __importDefault(require("../src/models/Order"));
var User_2 = require("../src/models/User");
factory_girl_1.default.define('User', User_1.default, {
    name: faker_1.default.name.firstName(),
    password: faker_1.default.internet.password(),
    question: User_2.Questions.first,
    response: 'A famosa',
    admin: true,
});
factory_girl_1.default.define('Item', Item_1.default, {
    name: faker_1.default.commerce.productName(),
    price: faker_1.default.commerce.price(),
    description: faker_1.default.commerce.productAdjective(),
    drink: faker_1.default.random.boolean(),
    stock: faker_1.default.random.number(50),
});
factory_girl_1.default.define('Order', Order_1.default, {
    identification: faker_1.default.random.number(999),
    total: faker_1.default.commerce.price(),
    note: faker_1.default.commerce.productAdjective(),
    closed: false,
    finished: false,
    payment: 'Dinhero',
    items: [{ product: factory_girl_1.default.assoc('Item', '_id'), quantity: faker_1.default.random.number(10) }],
});
exports.default = factory_girl_1.default;

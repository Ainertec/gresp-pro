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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_girl_1 = __importDefault(require("factory-girl"));
var faker_1 = __importDefault(require("faker"));
var User_1 = __importStar(require("../src/models/User"));
var Item_1 = __importDefault(require("../src/models/Item"));
var Order_1 = __importDefault(require("../src/models/Order"));
var Category_1 = __importDefault(require("../src/models/Category"));
var Ingredient_1 = __importDefault(require("../src/models/Ingredient"));
factory_girl_1.default.define('User', User_1.default, {
    name: faker_1.default.name.firstName(),
    password: faker_1.default.internet.password(),
    question: User_1.Questions.first,
    response: 'A famosa',
    admin: true,
});
factory_girl_1.default.define('Item', Item_1.default, {
    name: faker_1.default.commerce.productName(),
    price: faker_1.default.commerce.price(),
    description: faker_1.default.commerce.productAdjective(),
    drink: faker_1.default.random.boolean(),
    stock: faker_1.default.random.number(50),
    cost: faker_1.default.commerce.price(),
    ingredients: [
        {
            material: factory_girl_1.default.assoc('Ingredient', '_id'),
            quantity: faker_1.default.random.number(10),
        },
    ],
});
factory_girl_1.default.define('Ingredient', Ingredient_1.default, {
    name: faker_1.default.commerce.productName(),
    price: faker_1.default.commerce.price(),
    priceUnit: faker_1.default.commerce.price(),
    unit: 'g',
    stock: faker_1.default.random.number(100),
    description: faker_1.default.commerce.productAdjective(),
});
factory_girl_1.default.define('Category', Category_1.default, {
    name: faker_1.default.commerce.productName(),
    products: factory_girl_1.default.assocMany('Item', 2, '_id'),
});
factory_girl_1.default.define('Order', Order_1.default, {
    identification: faker_1.default.random.number(999),
    total: faker_1.default.commerce.price(),
    note: faker_1.default.commerce.productAdjective(),
    closed: false,
    finished: false,
    payment: 'Dinhero',
    items: [
        {
            product: factory_girl_1.default.assoc('Item', '_id'),
            quantity: faker_1.default.random.number(10),
        },
    ],
});
exports.default = factory_girl_1.default;

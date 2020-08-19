"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var UserController_1 = __importDefault(require("./controllers/UserController"));
var SessionController_1 = __importDefault(require("./controllers/SessionController"));
var ItemController_1 = __importDefault(require("./controllers/ItemController"));
var ForgotPasswordController_1 = __importDefault(require("./controllers/ForgotPasswordController"));
var OrderController_1 = __importDefault(require("./controllers/OrderController"));
var KitchenController_1 = __importDefault(require("./controllers/KitchenController"));
var SerialController_1 = __importDefault(require("./controllers/SerialController"));
var PrinterController_1 = __importDefault(require("./controllers/PrinterController"));
var ReportController_1 = __importDefault(require("./controllers/ReportController"));
var CategoryController_1 = __importDefault(require("./controllers/CategoryController"));
var Authentication_1 = __importDefault(require("./middlewares/Authentication"));
var Authorization_1 = __importDefault(require("./middlewares/Authorization"));
// Validations
var sessionSchema_1 = __importDefault(require("./validations/sessionSchema"));
var serialSchema_1 = __importDefault(require("./validations/serialSchema"));
var forgotSchema_1 = require("./validations/forgotSchema");
var userSchema_1 = require("./validations/userSchema");
var itemSchema_1 = require("./validations/itemSchema");
var orderSchema_1 = require("./validations/orderSchema");
var kitchenSchema_1 = __importDefault(require("./validations/kitchenSchema"));
var printerValidation_1 = __importDefault(require("./validations/printerValidation"));
var reportSchema_1 = __importDefault(require("./validations/reportSchema"));
var IngredientController_1 = __importDefault(require("./controllers/IngredientController"));
var routes = express_1.Router();
routes.post('/users/first', celebrate_1.celebrate({ body: userSchema_1.user }), UserController_1.default.store);
// Serial
routes.get('/serial_false', celebrate_1.celebrate({ query: serialSchema_1.default }), SerialController_1.default.exit);
// Session
routes.post('/sessions', celebrate_1.celebrate({ body: sessionSchema_1.default }), SessionController_1.default.create);
// Forgot Password
routes.get('/forgot', celebrate_1.celebrate({ query: forgotSchema_1.get }), ForgotPasswordController_1.default.show);
routes.post('/forgot', celebrate_1.celebrate({ body: forgotSchema_1.post }), ForgotPasswordController_1.default.store);
routes.get('/users/questions', UserController_1.default.getQuestions);
routes.use(Authentication_1.default);
// User
routes.get('/users', UserController_1.default.index);
routes.get('/users/:name', celebrate_1.celebrate({ params: userSchema_1.paramName }), UserController_1.default.show);
routes.post('/users', celebrate_1.celebrate({ body: userSchema_1.user }), UserController_1.default.create);
routes.put('/users/:id', celebrate_1.celebrate({ params: userSchema_1.paramIdUser, body: userSchema_1.userUpdate }), UserController_1.default.update);
routes.delete('/users/:id', celebrate_1.celebrate({ params: userSchema_1.paramIdUser }), UserController_1.default.delete);
// Item
routes.get('/items/:name', celebrate_1.celebrate({ params: itemSchema_1.paramNameItem, query: itemSchema_1.queryPage }), ItemController_1.default.show);
routes.get('/items', ItemController_1.default.index);
routes.post('/items', celebrate_1.celebrate({ body: itemSchema_1.item }), ItemController_1.default.create);
routes.put('/items/:id', celebrate_1.celebrate({ body: itemSchema_1.item, params: itemSchema_1.paramIdItem }), ItemController_1.default.update);
routes.delete('/items/:id', celebrate_1.celebrate({ params: itemSchema_1.paramIdItem }), ItemController_1.default.delete);
// Ingredients
routes.get('/ingredients', IngredientController_1.default.index);
routes.get('/ingredients/:name', 
// celebrate({ params: validations.paramName }),
IngredientController_1.default.show);
routes.post('/ingredients', 
// celebrate({ body: validations.ingredient }),
IngredientController_1.default.store);
routes.put('/ingredients/:id', 
// celebrate({ body: validations.ingredient, params: validations.paramId }),
IngredientController_1.default.update);
routes.delete('/ingredients/:id', 
// celebrate({ params: validations.paramId }),
IngredientController_1.default.delete);
// Categories
routes.get('/categories', CategoryController_1.default.index);
routes.get('/categories/:id', CategoryController_1.default.show);
routes.post('/categories', CategoryController_1.default.store);
routes.put('/categories/:id', CategoryController_1.default.update);
routes.delete('/categories/:id', CategoryController_1.default.delete);
// Order
routes.get('/orders', OrderController_1.default.index);
routes.get('/orders/:identification', celebrate_1.celebrate({ params: orderSchema_1.paramIdentification }), OrderController_1.default.show);
routes.post('/orders', celebrate_1.celebrate({ body: orderSchema_1.order }), OrderController_1.default.create);
routes.put('/orders/:identification', celebrate_1.celebrate({ body: orderSchema_1.orderUpdate, params: orderSchema_1.paramIdentification }), OrderController_1.default.update);
routes.delete('/orders/:identification/:payment', celebrate_1.celebrate({ params: orderSchema_1.paramIdenPayment }), OrderController_1.default.delete);
// Kitchen
routes.post('/kitchen', celebrate_1.celebrate({ body: kitchenSchema_1.default }), KitchenController_1.default.store);
routes.get('/kitchen', KitchenController_1.default.index);
// Printer
routes.post('/printer', celebrate_1.celebrate({ body: printerValidation_1.default }), PrinterController_1.default.create);
routes.use(Authorization_1.default);
// Report
routes.delete('/reports', ReportController_1.default.delete);
routes.get('/reports', celebrate_1.celebrate({ query: reportSchema_1.default }), ReportController_1.default.show);
routes.get('/reports/total', celebrate_1.celebrate({ query: reportSchema_1.default }), ReportController_1.default.showTotal);
routes.get('/reports/all', ReportController_1.default.index);
routes.get('/reports/products', ReportController_1.default.totalSoldProducts);
routes.get('/reports/orders', celebrate_1.celebrate({ query: reportSchema_1.default }), ReportController_1.default.showClosedOrders);
exports.default = routes;

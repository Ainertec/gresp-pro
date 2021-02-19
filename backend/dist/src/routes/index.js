"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var Session_routes_1 = require("./Session.routes");
var User_routes_1 = require("./User.routes");
var Item_routes_1 = require("./Item.routes");
var Ingredients_routes_1 = require("./Ingredients.routes");
var Category_routes_1 = require("./Category.routes");
var Order_routes_1 = require("./Order.routes");
var Report_routes_1 = require("./Report.routes");
var Kitchen_routes_1 = require("./Kitchen.routes");
var Printer_routes_1 = require("./Printer.routes");
var Authentication_1 = __importDefault(require("../middlewares/Authentication"));
var Authorization_1 = __importDefault(require("../middlewares/Authorization"));
var SerialController_1 = __importDefault(require("../controllers/SerialController"));
// Validations
var sessionSchema_1 = __importDefault(require("../validations/sessionSchema"));
var forgotSchema_1 = require("../validations/forgotSchema");
var userSchema_1 = require("../validations/userSchema");
var itemSchema_1 = require("../validations/itemSchema");
var ingredientSchema_1 = require("../validations/ingredientSchema");
var categorySchema_1 = require("../validations/categorySchema");
var orderSchema_1 = require("../validations/orderSchema");
var reportSchema_1 = require("../validations/reportSchema");
var kitchenSchema_1 = __importDefault(require("../validations/kitchenSchema"));
var printerValidation_1 = __importDefault(require("../validations/printerValidation"));
var serialSchema_1 = __importDefault(require("../validations/serialSchema"));
var CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
var routes = express_1.Router();
routes.get('/serial_false', celebrate_1.celebrate({ query: serialSchema_1.default }), SerialController_1.default.exit);
// Sessions
var sessionRoutes = new Session_routes_1.SessionRoutes(routes);
sessionRoutes.getRoutes({ session: sessionSchema_1.default, forgot: forgotSchema_1.post, forgotGet: forgotSchema_1.get });
routes.get('/categories/menu', CategoryController_1.default.indexMenu);
// Authentication
routes.use(Authentication_1.default);
// Users
var userRoutes = new User_routes_1.UserRoutes(routes);
userRoutes.getRoutes({ paramIdUser: userSchema_1.paramIdUser, paramName: userSchema_1.paramName, user: userSchema_1.user, userUpdate: userSchema_1.userUpdate });
// Items
var itemRoutes = new Item_routes_1.ItemRoutes(routes);
itemRoutes.getRoutes({ item: itemSchema_1.item, paramIdItem: itemSchema_1.paramIdItem, paramNameItem: itemSchema_1.paramNameItem, queryPage: itemSchema_1.queryPage });
// ingredients
var ingredientRoutes = new Ingredients_routes_1.IngredientsRoutes(routes);
ingredientRoutes.getRoutes({
    paramIdIngredients: ingredientSchema_1.paramIdIngredients,
    paramNameIngredients: ingredientSchema_1.paramNameIngredients,
    ingredient: ingredientSchema_1.ingredient,
});
// Category
var categoriesRoutes = new Category_routes_1.CategoryRoutes(routes);
categoriesRoutes.getRoutes({
    paramIdCategory: categorySchema_1.paramIdCategory,
    category: categorySchema_1.category,
});
// Order
var orderRoutes = new Order_routes_1.OrderRoutes(routes);
orderRoutes.getRoutes({
    order: orderSchema_1.order,
    orderUpdate: orderSchema_1.orderUpdate,
    paramIdentPayment: orderSchema_1.paramIdentPayment,
    paramIdentification: orderSchema_1.paramIdentification,
    orderDelete: orderSchema_1.orderDelete,
});
// Kitchen
var kitchenRoutes = new Kitchen_routes_1.KitchenRoutes(routes);
kitchenRoutes.getRoutes({
    kitchen: kitchenSchema_1.default,
});
// Printer
var printerRoutes = new Printer_routes_1.PrinterRoutes(routes);
printerRoutes.getRoutes({
    printer: printerValidation_1.default,
});
// Authorization
routes.use(Authorization_1.default);
// Report
var reportRoutes = new Report_routes_1.ReportRoutes(routes);
reportRoutes.getRoutes({
    report: reportSchema_1.report,
    reportDelete: reportSchema_1.reportDelete,
});
exports.default = routes;

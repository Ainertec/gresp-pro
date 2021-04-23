"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const Session_routes_1 = require("./Session.routes");
const User_routes_1 = require("./User.routes");
const Item_routes_1 = require("./Item.routes");
const Ingredients_routes_1 = require("./Ingredients.routes");
const Category_routes_1 = require("./Category.routes");
const Order_routes_1 = require("./Order.routes");
const Report_routes_1 = require("./Report.routes");
const Kitchen_routes_1 = require("./Kitchen.routes");
const Printer_routes_1 = require("./Printer.routes");
const Authentication_1 = __importDefault(require("../middlewares/Authentication"));
const Authorization_1 = __importDefault(require("../middlewares/Authorization"));
const SerialController_1 = __importDefault(require("../controllers/SerialController"));
// Validations
const sessionSchema_1 = __importDefault(require("../validations/sessionSchema"));
const forgotSchema_1 = require("../validations/forgotSchema");
const userSchema_1 = require("../validations/userSchema");
const itemSchema_1 = require("../validations/itemSchema");
const ingredientSchema_1 = require("../validations/ingredientSchema");
const categorySchema_1 = require("../validations/categorySchema");
const orderSchema_1 = require("../validations/orderSchema");
const reportSchema_1 = require("../validations/reportSchema");
const kitchenSchema_1 = __importDefault(require("../validations/kitchenSchema"));
const printerValidation_1 = require("../validations/printerValidation");
const serialSchema_1 = __importDefault(require("../validations/serialSchema"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const routes = express_1.Router();
routes.get('/serial_false', celebrate_1.celebrate({ query: serialSchema_1.default }), SerialController_1.default.exit);
// Sessions
const sessionRoutes = new Session_routes_1.SessionRoutes(routes);
sessionRoutes.getRoutes({ session: sessionSchema_1.default, forgot: forgotSchema_1.post, forgotGet: forgotSchema_1.get });
routes.get('/categories/menu', CategoryController_1.default.indexMenu);
// Authentication
routes.use(Authentication_1.default);
// Users
const userRoutes = new User_routes_1.UserRoutes(routes);
userRoutes.getRoutes({ paramIdUser: userSchema_1.paramIdUser, paramName: userSchema_1.paramName, user: userSchema_1.user, userUpdate: userSchema_1.userUpdate });
// Items
const itemRoutes = new Item_routes_1.ItemRoutes(routes);
itemRoutes.getRoutes({ item: itemSchema_1.item, paramIdItem: itemSchema_1.paramIdItem, paramNameItem: itemSchema_1.paramNameItem, queryPage: itemSchema_1.queryPage });
// ingredients
const ingredientRoutes = new Ingredients_routes_1.IngredientsRoutes(routes);
ingredientRoutes.getRoutes({
    paramIdIngredients: ingredientSchema_1.paramIdIngredients,
    paramNameIngredients: ingredientSchema_1.paramNameIngredients,
    ingredient: ingredientSchema_1.ingredient,
});
// Category
const categoriesRoutes = new Category_routes_1.CategoryRoutes(routes);
categoriesRoutes.getRoutes({
    paramIdCategory: categorySchema_1.paramIdCategory,
    category: categorySchema_1.category,
});
// Order
const orderRoutes = new Order_routes_1.OrderRoutes(routes);
orderRoutes.getRoutes({
    order: orderSchema_1.order,
    orderUpdate: orderSchema_1.orderUpdate,
    paramIdentPayment: orderSchema_1.paramIdentPayment,
    paramIdentification: orderSchema_1.paramIdentification,
    orderDelete: orderSchema_1.orderDelete,
});
// Kitchen
const kitchenRoutes = new Kitchen_routes_1.KitchenRoutes(routes);
kitchenRoutes.getRoutes({
    kitchen: kitchenSchema_1.default,
});
// Printer
const printerRoutes = new Printer_routes_1.PrinterRoutes(routes);
printerRoutes.getRoutes({
    printer: printerValidation_1.printer, printerComprovant: printerValidation_1.printerComprovant,
});
// Authorization
routes.use(Authorization_1.default);
// Report
const reportRoutes = new Report_routes_1.ReportRoutes(routes);
reportRoutes.getRoutes({
    report: reportSchema_1.report,
    reportDelete: reportSchema_1.reportDelete,
});
exports.default = routes;
//# sourceMappingURL=index.js.map
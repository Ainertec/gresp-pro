const express = require("express");

const ProductController = require("./controller/ProductController");
const DrinkableController = require("./controller/DrinkableController");
const OrderController = require("./controller/OrderController");
const LogController = require("./controller/LogController");
const KitchenController = require("./controller/KitchenController");
const SerialController = require("./controller/SerialController");
const LoginController = require("./controller/LoginController");
const PrinterController = require("./controller/PrinterController");


const routes = express.Router();

routes.get("/printer/",PrinterController.store);

routes.get("/kitchen/",KitchenController.index);
routes.post("/kitchen/",KitchenController.store);

routes.delete("/logs/:date",LogController.destroy);
routes.get("/logs_by_month/", LogController.index);
routes.get("/logs/", LogController.show);

routes.get("/order/", OrderController.show);
routes.get("/orders/", OrderController.index);
routes.post("/orders/", OrderController.store );
routes.put("/orders/:identification", OrderController.update );
routes.delete("/orders/:identification/:payment", OrderController.destroy );

routes.post("/drinkables/", DrinkableController.store );
routes.put("/drinkables/:id", DrinkableController.update );
routes.get("/drinkables/", DrinkableController.show );
routes.delete("/drinkables/:id", DrinkableController.destroy );

routes.post("/products/", ProductController.store );
routes.get("/products/", ProductController.show );
routes.put("/products/:id", ProductController.update );
routes.delete("/products/:id", ProductController.destroy );

routes.post("/login/", LoginController.store );
routes.get("/login/", LoginController.show );
routes.put("/login/:id", LoginController.update );
routes.delete("/login/:id", LoginController.destroy );

routes.get("/serial_false/", SerialController.exit);

module.exports = routes;

import { Router } from 'express';

import { celebrate } from 'celebrate';
import { SessionRoutes } from './Session.routes';
import { UserRoutes } from './User.routes';
import { ItemRoutes } from './Item.routes';
import { IngredientsRoutes } from './Ingredients.routes';
import { CategoryRoutes } from './Category.routes';
import { OrderRoutes } from './Order.routes';
import { ReportRoutes } from './Report.routes';
import { KitchenRoutes } from './Kitchen.routes';
import { PrinterRoutes } from './Printer.routes';
import Authentication from '../middlewares/Authentication';
import Authorization from '../middlewares/Authorization';
import SerialController from '../controllers/SerialController';

// Validations

import session from '../validations/sessionSchema';
import { get as forgotGet, post as forgot } from '../validations/forgotSchema';
import {
  paramIdUser,
  paramName,
  user,
  userUpdate,
} from '../validations/userSchema';
import {
  item,
  paramIdItem,
  paramNameItem,
  queryPage,
} from '../validations/itemSchema';
import {
  paramIdIngredients,
  paramNameIngredients,
  ingredient,
} from '../validations/ingredientSchema';
import { paramIdCategory, category } from '../validations/categorySchema';
import {
  order,
  orderUpdate,
  paramIdentPayment,
  paramIdentification,
  orderDelete,
} from '../validations/orderSchema';
import { report, reportDelete } from '../validations/reportSchema';
import kitchen from '../validations/kitchenSchema';
import printer from '../validations/printerValidation';
import serial from '../validations/serialSchema';
import CategoryController from '../controllers/CategoryController';

const routes = Router();

routes.get(
  '/serial_false',
  celebrate({ query: serial }),
  SerialController.exit,
);

// Sessions
const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes({ session, forgot, forgotGet });

routes.get('/categories/menu', CategoryController.indexMenu);

// Authentication
routes.use(Authentication);

// Users
const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes({ paramIdUser, paramName, user, userUpdate });

// Items
const itemRoutes = new ItemRoutes(routes);
itemRoutes.getRoutes({ item, paramIdItem, paramNameItem, queryPage });

// ingredients
const ingredientRoutes = new IngredientsRoutes(routes);
ingredientRoutes.getRoutes({
  paramIdIngredients,
  paramNameIngredients,
  ingredient,
});

// Category
const categoriesRoutes = new CategoryRoutes(routes);
categoriesRoutes.getRoutes({
  paramIdCategory,
  category,
});

// Order
const orderRoutes = new OrderRoutes(routes);
orderRoutes.getRoutes({
  order,
  orderUpdate,
  paramIdentPayment,
  paramIdentification,
  orderDelete,
});

// Kitchen
const kitchenRoutes = new KitchenRoutes(routes);
kitchenRoutes.getRoutes({
  kitchen,
});

// Printer
const printerRoutes = new PrinterRoutes(routes);
printerRoutes.getRoutes({
  printer,
});

// Authorization
routes.use(Authorization);

// Report
const reportRoutes = new ReportRoutes(routes);
reportRoutes.getRoutes({
  report,
  reportDelete,
});

export default routes;

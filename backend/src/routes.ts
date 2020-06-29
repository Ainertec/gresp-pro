import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import ItemController from './controllers/ItemController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import OrderController from './controllers/OrderController';
import KitchenController from './controllers/KitchenController';
import SerialController from './controllers/SerialController';
import PrinterController from './controllers/PrinterController';
import ReportController from './controllers/ReportController';

import Authentication from './middlewares/Authentication';
import Authorization from './middlewares/Authorization';

// Validations

import session from './validations/sessionSchema';
import serial from './validations/serialSchema';
import { get, post } from './validations/forgotSchema';
import { paramIdUser, user, userUpdate, paramName } from './validations/userSchema';
import { item, paramIdItem, paramNameItem, queryPage } from './validations/itemSchema';
import {
  order,
  orderUpdate,
  paramIdenPayment,
  paramIdentification,
} from './validations/orderSchema';
import kitchen from './validations/kitchenSchema';
import printer from './validations/printerValidation';
import report from './validations/reportSchema';

const routes = Router();

routes.post('/users/first', celebrate({ body: user }), UserController.store);

// Serial

routes.get('/serial_false', celebrate({ query: serial }), SerialController.exit);

// Session
routes.post('/sessions', celebrate({ body: session }), SessionController.create);

// Forgot Password

routes.get('/forgot', celebrate({ query: get }), ForgotPasswordController.show);

routes.post('/forgot', celebrate({ body: post }), ForgotPasswordController.store);

routes.get('/users/questions', UserController.getQuestions);

routes.use(Authentication);

// User

routes.get('/users', UserController.index);
routes.get('/users/:name', celebrate({ params: paramName }), UserController.show);
routes.post('/users', celebrate({ body: user }), UserController.create);
routes.put(
  '/users/:id',
  celebrate({ params: paramIdUser, body: userUpdate }),
  UserController.update
);
routes.delete('/users/:id', celebrate({ params: paramIdUser }), UserController.delete);

// Item

routes.get(
  '/items/:name',
  celebrate({ params: paramNameItem, query: queryPage }),
  ItemController.show
);
routes.get('/items', ItemController.index);
routes.post('/items', celebrate({ body: item }), ItemController.create);
routes.put('/items/:id', celebrate({ body: item, params: paramIdItem }), ItemController.update);
routes.delete('/items/:id', celebrate({ params: paramIdItem }), ItemController.delete);

// Order

routes.get('/orders', OrderController.index);
routes.get(
  '/orders/:identification',
  celebrate({ params: paramIdentification }),
  OrderController.show
);
routes.post('/orders', celebrate({ body: order }), OrderController.create);
routes.put(
  '/orders/:identification',
  celebrate({ body: orderUpdate, params: paramIdentification }),
  OrderController.update
);
routes.delete(
  '/orders/:identification/:payment',
  celebrate({ params: paramIdenPayment }),
  OrderController.delete
);

// Kitchen

routes.post('/kitchen', celebrate({ body: kitchen }), KitchenController.store);
routes.get('/kitchen', KitchenController.index);

// Printer

routes.post('/printer', celebrate({ body: printer }), PrinterController.create);

routes.use(Authorization);

// Report

routes.get('/reports', celebrate({ query: report }), ReportController.show);
routes.get('/reports/total', celebrate({ query: report }), ReportController.showTotal);
routes.get('/reports/all', ReportController.index);
routes.get('/reports/products', ReportController.totalSoldProducts);
routes.get('/reports/orders', celebrate({ query: report }), ReportController.showClosedOrders);

export default routes;

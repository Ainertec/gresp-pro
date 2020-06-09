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

import Authentication from './middlewares/Authentication';
import Authorization from './middlewares/Authorization';

const routes = Router();

// Serial Printer

routes.get('/serial_false/', SerialController.exit);

// Session
routes.post('/sessions', SessionController.create);
routes.get('/users/questions', UserController.getQuestions);

// Forgot Password

routes.get(
  '/forgot',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  ForgotPasswordController.show
);
routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().exist(),
      response: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  ForgotPasswordController.store
);

routes.get('/users_questions', UserController.getQuestions);

routes.use(Authentication);

// User

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Item

routes.get('/items/:name', ItemController.show);
routes.get('/items', ItemController.index);
routes.post('/items', ItemController.create);
routes.put('/items/:id', ItemController.update);
routes.delete('/items/:id', ItemController.delete);

// Order

routes.get('/orders', OrderController.index);
routes.get('/orders/:identification', OrderController.show);
routes.post('/orders', OrderController.create);
routes.put('/orders/:identification', OrderController.update);
routes.delete('/orders/:identification/:payment', OrderController.delete);

// Kitchen

routes.post('/kitchen', KitchenController.store);
routes.get('/kitchen', KitchenController.index);

// Printer

routes.get('/printer', PrinterController.create);

routes.use(Authorization);

// User

export default routes;

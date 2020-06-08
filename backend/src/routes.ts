import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import ItemController from './controllers/ItemController';

import Authentication from './middlewares/Authentication';
import Authorization from './middlewares/Authorization';

const routes = Router();

// Session
routes.post('/sessions', SessionController.create);
routes.get('/users/questions', UserController.getQuestions);

routes.use(Authentication);

// User

routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Item

routes.get('/items/:name', ItemController.show);
routes.get('/items', ItemController.index);
routes.post('/items', ItemController.create);
routes.put('/items/:id', ItemController.update);
routes.delete('/items/:id', ItemController.delete);

routes.use(Authorization);

// User

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

export default routes;

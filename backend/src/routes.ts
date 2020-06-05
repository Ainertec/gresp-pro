import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import Authentication from './middlewares/Authentication';

const routes = Router();

// Session
routes.post('/sessions', SessionController.create);

routes.use(Authentication);

// User
routes.get('/users', UserController.index);

routes.post('/users', UserController.create);

export default routes;

import { Router } from 'express';

import UserController from './controllers/UserController';

const routes = Router();

const teste = [1, 2, 3];

for (var ele of teste) {
}

routes.get('/users', UserController.index);

routes.post('/users', UserController.create);

export default routes;

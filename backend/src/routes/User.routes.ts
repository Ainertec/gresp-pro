import { Router } from 'express';
import { celebrate } from 'celebrate';
import UserController from '../controllers/UserController';
import { IValidateUser } from './routesDTO';

export class UserRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidateUser) {
    this.routes.get('/users', UserController.index);
    this.routes.get(
      '/users/:name',
      celebrate({ params: validations.paramName }),
      UserController.show,
    );
    this.routes.post(
      '/users',
      celebrate({ body: validations.user }),
      UserController.create,
    );
    this.routes.put(
      '/users/:id',
      celebrate({
        params: validations.paramIdUser,
        body: validations.userUpdate,
      }),
      UserController.update,
    );
    this.routes.delete(
      '/users/:id',
      celebrate({ params: validations.paramIdUser }),
      UserController.delete,
    );
  }
}

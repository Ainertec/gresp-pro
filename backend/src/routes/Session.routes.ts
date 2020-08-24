import { Router } from 'express';
import { celebrate } from 'celebrate';
import { IValidateSession } from './routesDTO';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';

export class SessionRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidateSession) {
    this.routes.post(
      '/sessions',
      celebrate({ body: validations.session }),
      SessionController.create,
    );
    this.routes.get(
      '/forgot',
      celebrate({ query: validations.forgotGet }),
      ForgotPasswordController.show,
    );

    this.routes.post(
      '/forgot',
      celebrate({ body: validations.forgot }),
      ForgotPasswordController.store,
    );

    this.routes.get('/users/questions', UserController.getQuestions);
  }
}

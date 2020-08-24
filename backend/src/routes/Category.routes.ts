import { Router } from 'express';
import { celebrate } from 'celebrate';
import CategoryController from '../controllers/CategoryController';
import { IValidationCategory } from './routesDTO';

export class CategoryRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationCategory) {
    this.routes.get('/categories', CategoryController.index);
    this.routes.get(
      '/categories/:id',
      celebrate({ params: validations.paramIdCategory }),
      CategoryController.show,
    );
    this.routes.post(
      '/categories',
      celebrate({ body: validations.category }),
      CategoryController.store,
    );
    this.routes.put(
      '/categories/:id',
      celebrate({
        body: validations.category,
        params: validations.paramIdCategory,
      }),
      CategoryController.update,
    );
    this.routes.delete(
      '/categories/:id',
      celebrate({ params: validations.paramIdCategory }),
      CategoryController.delete,
    );
  }
}

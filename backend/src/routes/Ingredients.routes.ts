import { Router } from 'express';
import { celebrate } from 'celebrate';
import IngredientController from '../controllers/IngredientController';
import { IValidationsIngredient } from './routesDTO';

export class IngredientsRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationsIngredient) {
    this.routes.get('/ingredients', IngredientController.index);
    this.routes.get(
      '/ingredients/:name',
      celebrate({ params: validations.paramNameIngredients }),
      IngredientController.show,
    );
    this.routes.post(
      '/ingredients',
      celebrate({ body: validations.ingredient }),
      IngredientController.store,
    );
    this.routes.put(
      '/ingredients/:id',
      celebrate({
        body: validations.ingredient,
        params: validations.paramIdIngredients,
      }),
      IngredientController.update,
    );
    this.routes.delete(
      '/ingredients/:id',
      celebrate({ params: validations.paramIdIngredients }),
      IngredientController.delete,
    );
  }
}

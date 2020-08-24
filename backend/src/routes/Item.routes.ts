import { Router } from 'express';
import { celebrate } from 'celebrate';
import ItemController from '../controllers/ItemController';
import { IValidationItem } from './routesDTO';

export class ItemRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationItem) {
    this.routes.get(
      '/items/:name',
      celebrate({
        params: validations.paramNameItem,
        query: validations.queryPage,
      }),
      ItemController.show,
    );
    this.routes.get('/items', ItemController.index);
    this.routes.post(
      '/items',
      celebrate({ body: validations.item }),
      ItemController.create,
    );
    this.routes.put(
      '/items/:id',
      celebrate({ body: validations.item, params: validations.paramIdItem }),
      ItemController.update,
    );
    this.routes.delete(
      '/items/:id',
      celebrate({ params: validations.paramIdItem }),
      ItemController.delete,
    );
  }
}

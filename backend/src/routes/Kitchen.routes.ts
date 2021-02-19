import { Router } from 'express';
import { celebrate } from 'celebrate';
import KitchenController from '../controllers/KitchenController';

import { IValidationKitchen } from './routesDTO';

export class KitchenRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationKitchen) {
    this.routes.post(
      '/kitchen',
      celebrate({ body: validations.kitchen }),
      KitchenController.store,
    );
    this.routes.get('/kitchen', KitchenController.index);
  }
}

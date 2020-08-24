import { Router } from 'express';
import { celebrate } from 'celebrate';
import OrderController from '../controllers/OrderController';
import { IValidationOrder } from './routesDTO';

export class OrderRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationOrder) {
    this.routes.get('/orders', OrderController.index);
    this.routes.get(
      '/orders/:identification',
      celebrate({ params: validations.paramIdentification }),
      OrderController.show,
    );
    this.routes.post(
      '/orders',
      celebrate({ body: validations.order }),
      OrderController.create,
    );
    this.routes.put(
      '/orders/:identification',
      celebrate({
        body: validations.orderUpdate,
        params: validations.paramIdentification,
      }),
      OrderController.update,
    );
    this.routes.delete(
      '/orders/:identification/:payment',
      celebrate({ params: validations.paramIdentPayment }),
      OrderController.delete,
    );
  }
}

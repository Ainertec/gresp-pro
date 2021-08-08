import { Router } from 'express';
import { celebrate } from 'celebrate';
import CashRegisterController from '../controllers/CashRegisterController';
import { IValidationCashRegister } from './routesDTO';

export class CashRegisterRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationCashRegister) {
    this.routes.get(
      '/cashregister',
      CashRegisterController.show,
    );
    this.routes.post(
      '/cashregister',
      celebrate({ body: validations.cashRegister }),
      CashRegisterController.store,
    );
    this.routes.put(
      '/cashregisterexits/:id',
      celebrate({
        body: validations.cashRegister,
        params: validations.paramIdCashRegister,
      }),
      CashRegisterController.updateExits,
    );
    this.routes.put(
        '/cashregisterclosure/:id',
        celebrate({
          body: validations.cashRegister,
          params: validations.paramIdCashRegister,
        }),
        CashRegisterController.updateClosure,
    );
    this.routes.delete(
      '/cashregister',
      CashRegisterController.delete,
    );
  }
}

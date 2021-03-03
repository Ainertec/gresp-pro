import { Router } from 'express';
import { celebrate } from 'celebrate';
import PrinterController from '../controllers/PrinterController';

import { IValidationPrinter } from './routesDTO';

export class PrinterRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationPrinter) {
    this.routes.post(
      '/printer',
      celebrate({ body: validations.printer }),
      PrinterController.create,
    );
    this.routes.post(
      '/printer/comprovant',
      celebrate({ body: validations.printerComprovant }),
      PrinterController.createComprovant,
    )
    this.routes.get('/printer/products', PrinterController.show);
    this.routes.get('/printer/orders', PrinterController.index);
  }
}

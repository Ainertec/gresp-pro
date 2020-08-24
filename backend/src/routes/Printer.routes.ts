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
  }
}

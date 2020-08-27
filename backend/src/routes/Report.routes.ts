import { Router } from 'express';
import { celebrate } from 'celebrate';
import ReportController from '../controllers/ReportController';

import { IValidationReport } from './routesDTO';

export class ReportRoutes {
  constructor(private routes: Router) {}

  getRoutes(validations: IValidationReport) {
    this.routes.delete('/reports', ReportController.delete);
    this.routes.get(
      '/reports',
      celebrate({ query: validations.report }),
      ReportController.show,
    );
    this.routes.get(
      '/reports/total',
      celebrate({ query: validations.report }),
      ReportController.showTotal,
    );
    this.routes.get('/reports/all', ReportController.index);
    this.routes.get('/reports/products', ReportController.totalSoldProducts);
    this.routes.get(
      '/reports/orders',
      celebrate({ query: validations.report }),
      ReportController.showClosedOrders,
    );
  }
}
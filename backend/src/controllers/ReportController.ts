import { sub, parseISO, isValid } from 'date-fns';
import { Request, Response } from 'express';
import Order from '../models/Order';
import { ItemInterface } from '../interfaces/base';
import { OrdersProfitUseCase } from '../UseCases/Report/OrderProfitUseCase';
import { SoldsProductsTotalUseCase } from '../UseCases/Report/SoldsProductsTotalUseCase';

interface ProductsTotalSold extends ItemInterface {
  amount: number;
}

class ReportController {
  public async show(req: Request, res: Response) {
    try {
      const orderProfitUseCase = new OrdersProfitUseCase(Order);
      const orders = await orderProfitUseCase.execute();
      return res.json(orders);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  public async showTotal(req: Request, res: Response) {
    const initial = String(req.query.initial);
    const final = String(req.query.final);

    const initialDate = parseISO(initial);
    const finalDate = parseISO(final);

    if (!isValid(initialDate) && !isValid(finalDate))
      return res.status(400).json({ message: 'invalid date' });

    const orders = await Order.aggregate()
      .match({
        createdAt: { $gte: initialDate, $lte: finalDate },
        closed: true,
      })
      .group({
        _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
        total: { $sum: 1 },
      })
      .sort({ amount: -1 });

    return res.json(orders);
  }

  public async showClosedOrders(req: Request, res: Response) {
    const initial = String(req.query.initial);
    const final = String(req.query.final);

    const initialDate = parseISO(initial);
    const finalDate = parseISO(final);

    if (!isValid(initialDate) && !isValid(finalDate))
      return res.status(400).json({ message: 'invalid date' });

    const orders = await Order.find({
      createdAt: { $gte: initialDate, $lte: finalDate },
      closed: true,
    }).populate('items.product');

    return res.json(orders);
  }

  public async totalSoldProducts(req: Request, res: Response) {
    try {
      const soldsProductsUseCase = new SoldsProductsTotalUseCase(Order);
      const products = await soldsProductsUseCase.execute();
      return res.json(products);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  public async delete(req: Request, res: Response) {
    const date = sub(new Date(), { years: 2 });

    await Order.deleteMany({
      createdAt: { $lte: date },
      closed: true,
    });

    return res.status(200).send();
  }
}

export default new ReportController();

import { sub, parseISO, isValid } from 'date-fns';
import { Request, Response } from 'express';
import Order from '../models/Order';
import Item from '../models/Item';
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

  public async costStock(req: Request, res: Response) {
    try {
      const item = await Item.find();
      const orders = await Order.find({
        closed: true,
      }).populate('items.product');

      const costTotalStock = item.reduce((sum, element) => {
        return sum + element.cost * (element.stock ? element.stock : 0);
      }, 0);

      const totalOrder = orders.reduce((sum, element) => {
        return sum + element.total;
      }, 0);

      return res.json({ costTotalStock, totalOrder });
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

    const result = orders.map((order) => {
      let costTotal = 0;
      order.items.forEach(element => {
        costTotal += element.product.cost * element.quantity;
      });

      return {
        order,
        costTotal
      };
    });

    return res.json(result);
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

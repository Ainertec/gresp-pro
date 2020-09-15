import { sub, parseISO, isValid, endOfDay, startOfDay } from 'date-fns';
import { Request, Response } from 'express';
import Order from '../models/Order';
import { ItemInterface } from '../interfaces/base';
import { OrdersProfitUseCase } from '../UseCases/Report/OrderProfitUseCase';

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
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

    const products = await Order.aggregate<ProductsTotalSold>()
      .match({
        createdAt: { $gte: initial, $lte: final },
        closed: true,
      })
      .unwind('items')
      .lookup({
        from: 'items',
        localField: 'items.product',
        foreignField: '_id',
        as: 'products',
      })
      .unwind('products')
      .group({
        _id: {
          id: '$products._id',
          name: '$products.name',
          description: '$products.description',
          price: '$products.price',
          stock: '$products.stock',
          drink: '$products.drink',
        },
        amount: { $sum: '$items.quantity' },
        soldout: {
          $sum: { $multiply: ['$items.quantity', '$products.price'] },
        },
      })
      .sort({ amount: -1 });

    // const totalProducts = products.reduce((sum, product) => {
    //   return sum + product.amount;
    // }, 0);

    // const serializedProducts = products.map(product => {
    //   return {
    //     ...product,
    //     amount: totalProducts,
    //   };
    // });
    return res.json(products);
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

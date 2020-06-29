import { sub, parseISO, isValid } from 'date-fns';
import { Request, Response } from 'express';
import Order from '../models/Order';
import { ItemInterface } from '../interfaces/base';

interface ProductsTotalSold extends ItemInterface {
  soldout: number;
}

class ReportController {
  public async show(req: Request, res: Response) {
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
        amount: { $sum: '$total' },
      })
      .sort({ amount: -1 });

    return res.json(orders);
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

  public async index(req: Request, res: Response) {
    const orders = await Order.find();

    const totalOrders = orders.reduce((sum, order) => {
      return sum + order.total;
    }, 0);

    return res.json({ total: totalOrders.toFixed(2) });
  }

  public async totalSoldProducts(req: Request, res: Response) {
    const products = await Order.aggregate<ProductsTotalSold>()
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
        soldout: { $sum: '$items.quantity' },
      })
      .sort({ soldout: -1 });

    const totalProducts = products.reduce((sum, product) => {
      return sum + product.soldout;
    }, 0);

    const serializadedProducts = products.map((product) => {
      return {
        ...product,
        soldout: totalProducts,
      };
    });
    return res.json(products);
  }

  public async delete(req: Request, res: Response) {
    const date = sub(new Date(), { years: 2 });

    await Order.deleteMany({
      createdAt: { $lte: date },
    });

    return res.status(200).send();
  }
}

export default new ReportController();

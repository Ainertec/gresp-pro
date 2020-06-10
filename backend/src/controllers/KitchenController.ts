import { Request, Response } from 'express';

import Order from '../models/Order';

class KitchenController {
  async store(req: Request, res: Response) {
    const { identification } = req.body;

    const order = await Order.findOneAndUpdate(
      { identification, closed: false },
      { finished: true },
      { new: true }
    ).populate('items.product');

    return res.json(order);
  }

  async index(req: Request, res: Response) {
    const orders = await Order.find({ closed: false, finished: true }).populate('items.product');
    return res.json(orders);
  }
}

export default new KitchenController();

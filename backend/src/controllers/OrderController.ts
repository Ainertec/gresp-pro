import { Request, Response } from 'express';

import { Document } from 'mongoose';
import { ItemInterface } from '../../src/interfaces/base';

import Order from '../models/Order';
import Item from '../models/Item';

interface ItemsIterface extends Document {
  product: ItemInterface;
  quantity: number;
}

class OrderController {
  public constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  public async getTotal(items: ItemsIterface[]) {
    let total = 0;
    const alert = Array<string>();
    await Promise.all(
      items.map(async (item) => {
        const consumedItem = await Item.findOne({ _id: item.product });
        if (consumedItem) {
          if (consumedItem.stock && consumedItem.stock <= 5) alert.push(consumedItem.name);
          total += consumedItem.price * item.quantity;
        }
      })
    );
    return { total, alert };
  }

  public async create(req: Request, res: Response) {
    const { identification, items, note } = req.body;

    if (await Order.findOne({ identification, closed: false }))
      return res.status(400).json('Order aready exist');

    const total = await this.getTotal(items);
    const finalPrice = total.total;

    const order = await Order.create({
      identification,
      items,
      total: finalPrice.toFixed(2),
      note,
      finished: false,
    });

    await order.populate('items.product').execPopulate();

    // req.io.emit('newOrder',order);
    return res.json({
      order,
      stockAlert: total.alert.length === 0 ? undefined : total.alert,
    });
  }
  public async update(req: Request, res: Response) {
    const { identification, items, note } = req.body;

    if (await Order.findOne({ identification, closed: false }))
      return res.status(400).json('Order aready exist');

    const total = await this.getTotal(items);
    const finalPrice = total.total;

    const order = await Order.findOneAndUpdate(
      { identification, closed: false },
      {
        identification,
        items,
        total: Number(finalPrice.toFixed(2)),
        note,
        finished: false,
      },
      {
        new: true,
      }
    );

    if (!order) return res.status(400).json('identification does not exist');

    await order.populate('items.product').execPopulate();

    // req.io.emit('newOrder',order);
    return res.json({
      order,
      stockAlert: total.alert.length === 0 ? undefined : total.alert,
    });
  }
}

export default new OrderController();

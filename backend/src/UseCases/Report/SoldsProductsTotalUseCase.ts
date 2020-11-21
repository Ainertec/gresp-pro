import { endOfDay, startOfDay } from 'date-fns';
import { Model } from 'mongoose';
import { OrderInterface } from '../../interfaces/base';

export class SoldsProductsTotalUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  async execute() {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

    const products = await this.OrderModel.aggregate()
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
    return products as {
      _id: {
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        drink: boolean;
      };
      amount: number;
      soldout: number;
    }[];
  }

  async executeMes() {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

    const products = await this.OrderModel.aggregate()
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
          cost: '$products.cost',
        },
        amount: { $sum: '$items.quantity' },
        soldout: {
          $sum: { $multiply: ['$items.quantity', '$products.price'] },
        },
      })
      .sort({ amount: -1 });
    return products as {
      _id: {
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        drink: boolean;
        cost: number;
      };
      amount: number;
      soldout: number;
    }[];
  }
}

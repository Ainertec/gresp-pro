import { Model } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../interfaces/base';

export class OrdersProfitUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute() {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

    const ordersProfit = await this.OrderModel.find({
      createdAt: { $gte: initial, $lte: final },
      closed: true,
    }).populate('items.product');

    const totalOrders = ordersProfit.reduce((sum, order) => {
      return sum + order.total;
    }, 0);
    const totalProducts = ordersProfit.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce((sum2, item) => {
          return sum2 + item.product?.cost * item.quantity;
        }, 0)
      );
    }, 0);
    const totalCourtesy = ordersProfit.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce((sum2, item) => {
          return sum2 + (item.courtesy ? item.quantity * item.product.cost : 0);
        }, 0)
      );
    }, 0);

    const filteredTotal = totalOrders - totalProducts;

    return {
      orders: ordersProfit,
      total: totalOrders.toFixed(2),
      netValue: filteredTotal.toFixed(2),
      totalCourtesy: totalCourtesy.toFixed(2),
    };
  }
}

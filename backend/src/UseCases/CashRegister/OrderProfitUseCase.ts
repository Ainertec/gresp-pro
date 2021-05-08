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
      return sum + (order.payment == 'dinheiro'? (order.total + order.tip):0);
    }, 0);
    const totalCardCreditFee = ordersProfit.reduce((sum, order) => {
      return sum + (order.payment == 'credito'? (order.cardcreditfee  + order.total + order.tip):0);
    }, 0);
    const totalCardDebitFee = ordersProfit.reduce((sum, order) => {
      return sum + (order.payment == 'debito'? (order.carddebitfee + order.total + order.tip):0);
    }, 0);

    return {
      orders: ordersProfit,
      total: totalOrders,
      totalCardCreditFee: totalCardCreditFee,
      totalCardDebitFee: totalCardDebitFee,
    };
  }
}

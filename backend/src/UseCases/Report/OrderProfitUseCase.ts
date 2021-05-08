import { Model } from 'mongoose';
import { startOfDay, endOfDay } from 'date-fns';
import { OrderInterface } from '../../interfaces/base';

export class OrdersProfitUseCase {
  constructor(private OrderModel: Model<OrderInterface>) {}

  public async execute(reqInicial: string, reqFinal: string) {
    const initial = String(reqInicial);
    const final = String(reqFinal);

    const ordersProfit = await this.OrderModel.find({
      createdAt: { $gte: initial, $lte: final },
      closed: true,
    }).populate('items.product');

    const totalOrders = ordersProfit.reduce((sum, order) => {
      return sum + (order.total + (order.tip? order.tip:0) + (process.env.COSTUMERFEE? order.cardcreditfee+order.carddebitfee:0));
    }, 0);
    const totalCardCreditFee = ordersProfit.reduce((sum, order) => {
      return sum + (order.cardcreditfee? order.cardcreditfee:0);
    }, 0);
    const totalCardDebitFee = ordersProfit.reduce((sum, order) => {
      return sum + (order.carddebitfee? order.carddebitfee:0);
    }, 0);
    const totalTip = ordersProfit.reduce((sum, order) => {
      return sum + (order.tip? order.tip:0);
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
    const totalCost = ordersProfit.reduce((sum, order) => {
      return (
        sum +
        order.items.reduce((sum2, item) => {
          return sum2 + item.quantity * item.product.cost;
        }, 0)
      );
    }, 0);

    const filteredTotal = totalOrders - (totalProducts + totalCardCreditFee + totalCardDebitFee + totalTip);

    return {
      orders: ordersProfit,
      total: totalOrders.toFixed(2),
      netValue: filteredTotal.toFixed(2),
      totalCourtesy: totalCourtesy.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalCardCreditFee: totalCardCreditFee.toFixed(2),
      totalCardDebitFee: totalCardDebitFee.toFixed(2),
      totalTip:totalTip.toFixed(2),
    };
  }
}

import { Request, Response } from 'express';
import CashRegister from '../models/CashRegister';
import { sub, startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';
import { OrdersProfitUseCase } from '../UseCases/CashRegister/OrderProfitUseCase';

class CashRegisterController {

  async show(request: Request, response: Response) {
    const initial = startOfDay(new Date());
    const final = endOfDay(new Date());

    const cashRegister = await CashRegister.find({
      createdAt: { $gte: initial, $lte: final }
    });

    return response.json(cashRegister);
  }

  async store(request: Request, response: Response) {
    const { thing } = request.body;

    const cashRegister = await CashRegister.create({
      thing,
      cash: 0,
      closure: 0,
      credit: 0,
      debit: 0,
      exits: [],
    });
    return response.json(cashRegister);
  }

  async updateExits(request: Request, response: Response) {
    const { exits } = request.body;
    const { id } = request.params;

    const cashRegister = await CashRegister.findByIdAndUpdate(
      { _id: id },
      {
        exits
      },
      { new: true },
    );
    if (!cashRegister) {
      return response.status(400).json('That cash register does not exist');
    }
    return response.json(cashRegister);
  }

  async updateClosure(request: Request, response: Response) {
    const { closure } = request.body;
    const { id } = request.params;

    const orderProfitUseCase = new OrdersProfitUseCase(Order);
    const results = await orderProfitUseCase.execute();

    const cashRegister = await CashRegister.findByIdAndUpdate(
      { _id: id },
      {
        debit: results.totalCardDebitFee,
        credit: results.totalCardCreditFee,
        cash: results.total,
        closure
      },
      { new: true },
    );
    if (!cashRegister) {
      return response.status(400).json('That cash register does not exist');
    }
    return response.json(cashRegister);
  }

  async delete(req: Request, res: Response) {
    const date = sub(new Date(), { years: 2 });

    await Order.deleteMany({
      createdAt: { $lte: date },
    });

    return res.status(200).send();
  }

}

export default new CashRegisterController();

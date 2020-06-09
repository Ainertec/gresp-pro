import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import Order from '../models/Order';
import { ItemsIterface } from '../interfaces/base';

class PrinterController {
  constructor() {
    this.create = this.create.bind(this);
  }

  private toPrinter(items: ItemsIterface[]) {
    let products = '';
    let drinks = '';

    for (const item of items) {
      if (item.product.drink) {
        drinks += `
        * ${item.product.name}
        - Quantidade: ${item.quantity}\n`;
      } else {
        products += `
        * ${item.product.name}
        - Quantidade: ${item.quantity}\n`;
      }
    }
    return { products, drinks };
  }

  async create(req: Request, res: Response) {
    const { type } = req.query;
    const identification = Number(req.query.identification);

    const order = await Order.findOne({ closed: false, identification });

    if (!order) return res.status(400).json('orders does not exist!');

    await order.populate('items.product').execPopulate();

    if (order.items) {
      const items = this.toPrinter(order.items);

      const data = `
      ----------------------\n
      >>>>>> Comanda <<<<<<<\n\n
      Número: ${order.identification}\n
      Tipo: ${type}\n\n
      ====== Produtos ======\n
      ${items.products}
      ======= Bebidas ======\n
      ${items.drinks}
      ===== Observação =====\n
      - ${order.note}\n\n
      ======================
      `;
      const dir = process.env.NODE_ENV
        ? path.resolve(__dirname, '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;

      await fs.writeFile(
        `${dir}/${identification}.txt`,
        data,
        { encoding: 'utf-8', flag: 'w' },
        (err) => {
          if (err) return res.status(400).json(`${err}`);
          return res.status(200).json('success');
        }
      );
    } else {
      return res.status(400).json('There are no items');
    }
  }
}

export default new PrinterController();

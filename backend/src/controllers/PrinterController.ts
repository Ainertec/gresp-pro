/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';
import { format, startOfDay, endOfDay } from 'date-fns';
import JsRtf from 'jsrtf';
import Order from '../models/Order';
import { ItemsInterface, ItemInterface } from '../interfaces/base';
import { printFile,printFileProof } from '../utils/print';
import { SoldsProductsTotalUseCase } from '../UseCases/Report/SoldsProductsTotalUseCase';
import { OrdersProfitUseCase } from '../UseCases/Report/OrderProfitUseCase';

export interface OldItems {
  product: string;
  quantity: number;
}

class PrinterController {
  constructor() {
    this.create = this.create.bind(this);
  }

  private toPrinterUpdated(items: ItemsInterface[], oldItems: OldItems[]) {
    const products: ItemsInterface[] = [];
    const drinks: ItemsInterface[] = [];

    oldItems.map(oldItem => {
      const position = items.findIndex(
        item =>
          String(item.product._id) === String(oldItem.product) &&
          item.quantity === oldItem.quantity,
      );
      if (position >= 0) {
        items.splice(position, 1);
      }
      items.map(
        item => {
          if(String(item.product._id) === String(oldItem.product))
          item.quantity = item.quantity - oldItem.quantity
        }
      )
    });

    items.map(item => {
      if (item.product.drink) {
        drinks.push(item);
      } else {
        products.push(item);
      }
    });
    return { products, drinks };
  }

  private toPrinterNew(items: ItemsInterface[]) {
    const products: ItemsInterface[] = [];
    const drinks: ItemsInterface[] = [];

    items.map(item => {
      if (item.product.drink) {
        drinks.push(item);
      } else {
        products.push(item);
      }
    });
    return { products, drinks };
  }

  async create(req: Request, res: Response) {
    const { identification, oldItems, type } = req.body;
    const order = await Order.findOne({ closed: false, identification });

    if (!order) return res.status(400).json('orders does not exist!');

    await order.populate('items.product').execPopulate();

    const date = order.updatedAt
      ? format(order.updatedAt, 'dd/MM/yyyy HH:mm:ss')
      : '';
    const myDoc = new JsRtf({
      language: JsRtf.Language.BR,
      pageWidth: JsRtf.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      paragraph: true,
    });
    const contentBorder = new JsRtf.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 8,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: JsRtf.Colors.GREEN },
    });

    let notItem = false;
    for (const iterator of order.items) {
      if(Boolean(iterator.product.print && (!iterator.product.drink || Boolean(process.env.PRINTDRINK == 'true')))){
        notItem = true;
      }
    }

    if (order.items && notItem) {
      console.log(type)
      const items = type
        ? this.toPrinterNew(order.items)
        : this.toPrinterUpdated(order.items, oldItems);

      myDoc.writeText('', contentBorder);
      myDoc.writeText('>>>>>>>>> Comanda <<<<<<<<<<', header);
      myDoc.writeText(`Número: ${order.identification}`, header);
      type
        ? myDoc.writeText(`Tipo: Novo`, header)
        : myDoc.writeText(`Tipo: Atualizado`, header);

      if( process.env.PRINTDRINK ){
        myDoc.writeText('=========== Bebidas ==========', contentBorder);
        items.drinks.map(item => {
          if(item.product.print){
            myDoc.writeText(
              `* ${item.product.name} ${item.courtesy ? '/ Cortesia' : ''}`,
              contentStyle,
            );
            myDoc.writeText(`- Quantidade: ${item.quantity}`, contentStyle);
            // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
          }
        }); 
      }

      myDoc.writeText('=========== Produtos ==========', contentBorder);
      items.products.map(item => {
        if(item.product.print){
          myDoc.writeText(
            `* ${item.product.name} ${item.courtesy ? '/ Cortesia' : ''}`,
            contentStyle,
          );
          myDoc.writeText(`- Quantidade: ${item.quantity}`, contentStyle);
          // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
        }
      });
      myDoc.writeText('========== Observação =========', contentStyle);
      myDoc.writeText(
        `\n- ${order.note ? order.note : 'Nenhuma.'}\n`,
        contentStyle,
      );
      myDoc.writeText(`- ${date}`, contentStyle);

      const content = myDoc.createDocument();
      try {
        printFile(content, String(identification));
        return res.status(200).send();
      } catch (error) {
        return res.status(400).json(error.message);
      }
    } else {
      return res.status(400).json('There are no items');
    }
  }

  async createComprovant(req: Request, res: Response) {
    const { identification, payment } = req.body;
    const order = await Order.findOne({ closed: false, identification });

    if (!order) return res.status(400).json('orders does not exist!');

    await order.populate('items.product').execPopulate();

    const date = order.updatedAt
      ? format(order.updatedAt, 'dd/MM/yyyy HH:mm:ss')
      : '';
    const myDoc = new JsRtf({
      language: JsRtf.Language.BR,
      pageWidth: JsRtf.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      paragraph: true,
    });
    const contentBorder = new JsRtf.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 8,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: JsRtf.Colors.GREEN },
    });

    if (order.items) {

      myDoc.writeText('', contentBorder);
      myDoc.writeText('>>>>>>>>> Comprovante <<<<<<<<<<', header);
      myDoc.writeText(`Identificador: ${order.identification}`, header);
      myDoc.writeText('=========== Produtos ==========', contentBorder);
      order.items.map(item => {
        myDoc.writeText(
          `* ${item.product.name} ${item.courtesy ? '/ Cortesia' : ''}`,
          contentStyle,
        );
        myDoc.writeText(`- Quantidade: ${item.quantity} --- Valor:R$ ${(item.product.price).toFixed(2)}`, contentStyle);
        // item.courtesy && myDoc.writeText(`Cortesia`, contentStyle);
      });
      myDoc.writeText('========== Observação =========', contentStyle);
      myDoc.writeText(
        `\n- ${order.note ? order.note : 'Nenhuma.'}\n`,
        contentStyle,
      );
      myDoc.writeText('=========== Resumo ===========', contentStyle);
      myDoc.writeText(
        `\n- Valor do pedido: R$${(order.total).toFixed(2)}\n`,
        contentStyle,
      );
      if(payment == 'dinheiro'){
        myDoc.writeText(
          `- Taxa de serviço/gorjeta: R$${order.tip? (order.tip).toFixed(2):'0.00'}\n`,
          contentStyle,
        );
        myDoc.writeText('- - - - - - - - - - - - - - - - - - - - - - - - -', contentStyle);
        myDoc.writeText(
          `\n- Total no dinheiro: R$${(order.total + order.tip).toFixed(2)}\n`,
          contentStyle,
        );
      }else if(payment == 'debito'){
        myDoc.writeText(
          `- Taxa de serviço/gorjeta: R$${order.tip? (order.tip).toFixed(2):'0.00'}\n`,
          contentStyle,
        );
        myDoc.writeText(
          `- Taxa de Cartão: R$${order.carddebitfee? (order.carddebitfee).toFixed(2):'0.00'}\n`,
          contentStyle,
        );
        myDoc.writeText('- - - - - - - - - - - - - - - - - - - - - - - - -', contentStyle);
        myDoc.writeText(
          `\n- Total no débito: R$${(order.total + order.carddebitfee + order.tip ).toFixed(2)}\n`,
          contentStyle,
        );
      }else{
        myDoc.writeText(
          `- Taxa de serviço/gorjeta: R$${order.tip? (order.tip).toFixed(2):'0.00'}\n`,
          contentStyle,
        );
        myDoc.writeText(
          `- Taxa de Cartão: R$${order.cardcreditfee? (order.cardcreditfee).toFixed(2):'0.00'}\n`,
          contentStyle,
        );
        myDoc.writeText('- - - - - - - - - - - - - - - - - - - - - - - - -', contentStyle);
        myDoc.writeText(
          `\n- Total no crédito: R$${(order.total + order.cardcreditfee + order.tip).toFixed(2) }\n`,
          contentStyle,
        );
      }

      myDoc.writeText(`- Data/hora ${date}`, contentStyle);

      const content = myDoc.createDocument();
      try {
        printFileProof(content, String(identification));
        return res.status(200).send();
      } catch (error) {
        return res.status(400).json(error.message);
      }
    } else {
      return res.status(400).json('There are no items');
    }
  }

  async show(req: Request, res: Response) {
    const products = await new SoldsProductsTotalUseCase(Order).execute();
    const myDoc = new JsRtf({
      language: JsRtf.Language.BR,
      pageWidth: JsRtf.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      paragraph: true,
    });
    const contentBorder = new JsRtf.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 8,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: JsRtf.Colors.GREEN },
    });
    const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
    myDoc.writeText('', contentBorder);
    myDoc.writeText('>>>>> Relatório de Produtos <<<<<', header);
    products.map(product => {
      myDoc.writeText(`Name:${product._id.name} `, contentStyle);
      myDoc.writeText(`Price:${product._id.price} `, contentStyle);
      myDoc.writeText(`Estoque:${product._id.stock} `, contentStyle);
      myDoc.writeText(`Receita:${product.amount} `, contentStyle);
      myDoc.writeText(`Qt.vendida:${product.soldout} `, contentBorder);
    });
    myDoc.writeText(`Relatório referente ao dia:${date} `, header);
    const content = myDoc.createDocument();
    try {
      printFileProof(content, 'productsReport');
      return res.status(200).send();
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async index(req: Request, res: Response) {
    const ordersProfit = await new OrdersProfitUseCase(Order).execute(String(startOfDay(new Date())), String(endOfDay(new Date())));
    const myDoc = new JsRtf({
      language: JsRtf.Language.BR,
      pageWidth: JsRtf.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      paragraph: true,
    });
    const contentBorder = new JsRtf.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 8,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new JsRtf.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: JsRtf.Colors.GREEN },
    });
    const date = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

    myDoc.writeText('', contentBorder);
    myDoc.writeText('>>>> Relatório de Produtos <<<<<', header);

    myDoc.writeText(`Total Líquido:${ordersProfit.netValue} `, header);
    myDoc.writeText(`Total bruto :${ordersProfit.total} `, header);
    myDoc.writeText(
      `Total gasto com cortesia:${ordersProfit.totalCourtesy} `,
      header,
    );
    myDoc.writeText(`Relatório referente ao dia:${date} `, header);

    const content = myDoc.createDocument();
    try {
      printFileProof(content, 'ordersReport');
      return res.status(200).send();
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default new PrinterController();

import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
// import '../@types/jsrtg.d.ts'
import jsRTF from 'jsrtf';
import Order from '../models/Order';
import { ItemsIterface } from '../interfaces/base';

export interface OldItems {
  product: string,
  quantity: number,
}


class PrinterController {
  constructor() {
    this.create = this.create.bind(this);
  }

  private toPrinterUpdated(items: ItemsIterface[], oldItems: OldItems[]){
    let products = '';
    let drinks = '';

    const response = oldItems.map(oldItem=>{
      return items.filter(
        item => (String(item.product._id) !== oldItem.product || item.quantity !== oldItem.quantity)
        )
     })

    for (const item of response[0]) {
      if (item.product.drink) {
drinks += `* ${item.product.name}
- Quantidade: ${item.quantity}\n`;
      } else {
products += `* ${item.product.name}
- Quantidade: ${item.quantity}\n`;
      }
    }
    return { products, drinks };
    
                                             
  }

  private toPrinterNew(items: ItemsIterface[]) {
    let products = '';
    let drinks = '';

    for (const item of items) {
      if (item.product.drink) {
drinks += `* ${item.product.name}
- Quantidade: ${item.quantity}\n`;
      } else {
products += `* ${item.product.name}
- Quantidade: ${item.quantity}\n`;
      }
    }
    return { products, drinks };
  }

  async create(req: Request, res: Response) {
    const { identification,oldItems,type } = req.body

    const order = await Order.findOne({ closed: false, identification });

    if (!order) return res.status(400).json('orders does not exist!');

    await order.populate('items.product').execPopulate();


    const myDoc = new jsRTF({
      language: jsRTF.Language.BR,
      pageWidth: jsRTF.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });
    const contentStyle = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 8,
      //paragraph: true,
    });
    const contentBorder = new jsRTF.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 8,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 8,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: jsRTF.Colors.GREEN },
    });
    
    if (order.items) {
    
      const items = type ? this.toPrinterNew(order.items) : this.toPrinterUpdated(order.items,oldItems);

      

      myDoc.writeText('------------------------------------------------', contentBorder);
      myDoc.writeText('>>>>>>>>> Comanda <<<<<<<<<<', header);
      myDoc.writeText(`Número: ${order.identification}`, header);
      type ? myDoc.writeText(`Tipo: Novo`, header) : myDoc.writeText(`Tipo: Atualizado`, header);
      myDoc.writeText(`Hora: ${order.identification}`, header);
      myDoc.writeText('=========== Produtos ==========', contentBorder);
      myDoc.writeText(`${items.products}`, contentStyle);
      myDoc.writeText('=========== Bebidas ===========', contentBorder);
      myDoc.writeText(`${items.drinks}`, contentStyle);
      myDoc.writeText('========== Observação =========', contentBorder);
      myDoc.writeText(`- ${order.note}`, contentStyle);
   
      const content = myDoc.createDocument();

      const buffer =  Buffer.from(content, 'binary');
      
      const dir =
        process.env.NODE_ENV === 'test'
          ? path.resolve(__dirname, '..', '..', '__tests__', 'recipes')
          : process.env.DIR_PRODUCTION;

      await fs.writeFile(
        `${dir}/${identification}.rtf`,
        buffer,
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



const Order = require('../model/Order');
const fs = require('fs');

function toPrinter(param, type) {
  let string = '';
  if (param == null)
    return string;

  if (type === 1) {


    for (const item of param) {
      if (item.product == null)
        throw Error("product does not exist!");

      string += `
    * ${item.product.name}
    - Quantidade: ${item.quantity}\n`
    }
  } else {
    for (const item of param) {
      if (item.drinkable == null)
        throw Error("drinkable does not exist");
      string += `
    * ${item.drinkable.name}
    - Quantidade: ${item.quantity}\n`
    }
  }
  return string;
}

module.exports = {
  async store(req, res) {
    const { identification, type } = req.query;

    if(!identification)
      return res.status(400).json('identification not informated!');

    const order = await Order.findOne({'closed': false, identification });

    if(!order)
      return res.status(400).json('orders does not exist!');

    await order.populate('products.product').populate('drinkables.drinkable').execPopulate();

    try {

      const products = toPrinter(order.products, 1);
      const drinkables = toPrinter(order.drinkables, 2);


      const data = `
    ----------------------\n
    >>>>>> Comanda <<<<<<<\n\n
    Número: ${order.identification}\n
    Tipo: ${type}\n\n
    ====== Produtos ======\n
    ${products}
    ======= Bebidas ======\n
    ${drinkables}
    ===== Observação =====\n
    - ${order.note}\n\n
    ======================
    `


      await fs.writeFile(`C:/gresppro-x64/program/commands/commandsCreate/${identification}.txt`, data,
        { encoding: 'utf-8', flag: 'w' },
        (err) => {
          if (err) throw err
          return res.status(200).json("success");
        }
      );
    } catch (err) {
      return res.status(400).json(`${err}`);
    }



  }
}
const Order = require('../model/Order');
const Product = require('../model/Product');
const Drinkable = require('../model/Drinkable');

async function getTotal(products, drinkables) {
  var productsTotal = 0;
  var drinkableTotal = 0;
  var alert = '';

  if (!drinkables) drinkables = [];
  if (!products) products = [];

  for (const element of products) {
    let productsTemporary = await Product.findOne({ _id: element.product });
    if (productsTemporary) productsTotal += productsTemporary.price * element.quantity;
  }
  for (const element of drinkables) {
    let drinkableTemporary = await Drinkable.findOne({ _id: element.drinkable });
    if (drinkableTemporary.stock <= 5)
      alert += ' estoque acabando: ' + drinkableTemporary.name + '.\n ';
    if (drinkableTemporary) drinkableTotal += drinkableTemporary.price * element.quantity;
  }
  return { total: productsTotal + drinkableTotal, alert };
}

module.exports = {
  async store(req, res) {
    const { identification, products, drinkables, note } = req.body;
    if ((!products && !drinkables) || !identification)
      return res.status(400).json('products and drinkables or identification does not infomated');

    if (await Order.findOne({ identification, closed: false }))
      return res.status(400).json('Order aready exist');
    const total = await getTotal(products, drinkables);
    const finalPrice = total.total;
    try {
      const order = await Order.create({
        identification,
        products,
        drinkables,
        total: finalPrice.toFixed(2),
        note,
        finished: false,
      });
      await order.populate('products.product').populate('drinkables.drinkable').execPopulate();
      const aux = { order, alert: total.alert };
      req.io.emit('newOrder', order);
      return res.json(aux);
    } catch (err) {
      return res.status(500).json('database or server error');
    }
  },
  async update(req, res) {
    const { products, drinkables, note } = req.body;
    const { identification } = req.params;

    if ((!products && !drinkables) || !identification)
      return res.status(400).json('products and drinkables or identification does not infomated');

    const total = await getTotal(products, drinkables);
    const finalPrice = total.total;

    try {
      const orderUpdated = await Order.findOneAndUpdate(
        { identification, closed: false },
        {
          identification,
          products,
          drinkables,
          total: finalPrice.toFixed(2),
          note,
          finished: false,
        }
      );
      if (!orderUpdated) return res.status(400).json('identification does not exist');

      const order = await Order.findOne({ identification, closed: false });
      await order.populate('products.product').populate('drinkables.drinkable').execPopulate();
      const aux = { order, alert: total.alert };
      req.io.emit('newOrder', order);
      return res.json(aux);
    } catch (err) {
      res.status(500).json('database or server error');
    }
  },
  async destroy(req, res) {
    const { identification, payment } = req.params;

    try {
      const order = await Order.findOneAndUpdate(
        { identification, closed: false },
        { closed: true, payment: payment }
      );

      if (!order)
        return res.status(400).json('order aready closed or identification does not exist');

      if (order.drinkables) {
        for (const element of order.drinkables) {
          const drinkables = await Drinkable.findOne({ _id: element.drinkable });
          let stock = drinkables.stock - element.quantity;
          await Drinkable.update({ _id: element.drinkable }, { stock: stock });
        }
      }
      req.io.emit('payment', order);
      return res.json('Order was closed with success!');
    } catch (err) {
      return res.status(500).json(err, 'server error');
    }
  },

  async index(req, res) {
    const orders = await Order.find({ closed: false, finished: false });
    if (orders)
      for (const element of orders)
        await element.populate('products.product').populate('drinkables.drinkable').execPopulate();
    return res.json(orders);
  },

  async show(req, res) {
    const { identification } = req.query;

    const order = await Order.findOne({ identification, closed: false });
    if (order)
      await order.populate('products.product').populate('drinkables.drinkable').execPopulate();
    return res.json(order);
  },
};

const Order = require('../model/Order');
module.exports = {
  async store(req, res) {
    const { identification } = req.body;

    if (!identification)
      return res.status(400).json("identification does not informed");

    const order = await Order.findOneAndUpdate({ identification, "closed": false }, { "finished": true });
    await order.populate('products.product').populate('drinkables.drinkable').execPopulate();
    return res.json(order);
  },
  async index(req, res) {
    const orders = await Order.find({ "closed": false, "finished": true });
    for (const element of orders)
      await element.populate('products.product').populate('drinkables.drinkable').execPopulate();

    return res.json(orders);
  }
}
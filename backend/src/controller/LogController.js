const Order = require('../model/Order');

module.exports = {
  async  show(req, res) {

    const { date } = req.query;

    if (!date)
      return res.status(400).json("date does not informated!");

    var dateArray = date.split('-');

    if (!dateArray[1])
      return res.status(400).json("month does not informated!");

    if (dateArray[1] <= 0 || dateArray[1] >= 13)
      return res.status(400).json("month does not exist!");

    if (dateArray[2])
      return res.status(400).json("day must not be informed!");

    const orders = await Order.find({ 'closed': true, 'update_at': { $gte: date + ' 1', $lte: date + ' 31' } });
    let total = 0;
    for(const element of orders){
      if(element.total != undefined)
        total += element.total;
    };

    return res.json(orders);
  },
  async index(req, res) {

    const orders = await Order.find({ 'closed': true });
    return res.json(orders);

  },

  async destroy(req, res) {
    const { date } = req.params;
    if (!date)
      return res.status(400).json("date does not informated!");

    var dateArray = date.split('-');

    if (!dateArray[1])
      return res.status(400).json("month does not informated!");

    if (dateArray[1] <= 0 || dateArray[1] >= 13)
      return res.status(400).json("month does not exist!");

    await Order.deleteMany({ 'closed': true, 'update_at': { $gte: date + ' 1', $lte: date + ' 31' } })

    return res.json("log was deleted with success")
  }
}
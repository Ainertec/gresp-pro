"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../models/Order"));
class KitchenController {
    async store(req, res) {
        const { identification } = req.body;
        const order = await Order_1.default.findOneAndUpdate({ identification, closed: false }, { finished: true }, { new: true }).populate('items.product');
        return res.json(order);
    }
    async index(req, res) {
        const orders = await Order_1.default.find({ closed: false, finished: true }).populate('items.product');
        return res.json(orders);
    }
}
exports.default = new KitchenController();
//# sourceMappingURL=KitchenController.js.map
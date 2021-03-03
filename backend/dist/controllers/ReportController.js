"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const Order_1 = __importDefault(require("../models/Order"));
const Item_1 = __importDefault(require("../models/Item"));
const OrderProfitUseCase_1 = require("../UseCases/Report/OrderProfitUseCase");
const SoldsProductsTotalUseCase_1 = require("../UseCases/Report/SoldsProductsTotalUseCase");
class ReportController {
    async show(req, res) {
        const initial = String(req.query.initial);
        const final = String(req.query.final);
        try {
            const orderProfitUseCase = new OrderProfitUseCase_1.OrdersProfitUseCase(Order_1.default);
            const orders = await orderProfitUseCase.execute(initial, final);
            return res.json(orders);
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
    async costStock(req, res) {
        try {
            const item = await Item_1.default.find();
            const costTotalStock = item.reduce((sum, element) => {
                return sum + element.cost * (element.stock ? element.stock : 0);
            }, 0);
            return res.json(costTotalStock);
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
    async showTotal(req, res) {
        const initial = String(req.query.initial);
        const final = String(req.query.final);
        const initialDate = date_fns_1.parseISO(initial);
        const finalDate = date_fns_1.parseISO(final);
        if (!date_fns_1.isValid(initialDate) && !date_fns_1.isValid(finalDate))
            return res.status(400).json({ message: 'invalid date' });
        const orders = await Order_1.default.aggregate()
            .match({
            createdAt: { $gte: initialDate, $lte: finalDate },
            closed: true,
        })
            .group({
            _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
            total: { $sum: 1 },
        })
            .sort({ amount: -1 });
        return res.json(orders);
    }
    async showClosedOrders(req, res) {
        const initial = String(req.query.initial);
        const final = String(req.query.final);
        const initialDate = date_fns_1.parseISO(initial);
        const finalDate = date_fns_1.parseISO(final);
        if (!date_fns_1.isValid(initialDate) && !date_fns_1.isValid(finalDate))
            return res.status(400).json({ message: 'invalid date' });
        const orders = await Order_1.default.find({
            createdAt: { $gte: initialDate, $lte: finalDate },
            closed: true,
        }).populate('items.product');
        const result = orders.map(order => {
            let costTotal = 0;
            order.items.forEach(element => {
                costTotal += element.product.cost * element.quantity;
            });
            return {
                order,
                costTotal,
            };
        });
        return res.json(result);
    }
    async totalSoldProducts(req, res) {
        try {
            const soldsProductsUseCase = new SoldsProductsTotalUseCase_1.SoldsProductsTotalUseCase(Order_1.default);
            const products = await soldsProductsUseCase.execute();
            return res.json(products);
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
    async totalSoldProductsMes(req, res) {
        try {
            const soldsProductsUseCase = new SoldsProductsTotalUseCase_1.SoldsProductsTotalUseCase(Order_1.default);
            const products = await soldsProductsUseCase.executeMes();
            return res.json(products);
        }
        catch (error) {
            return res.status(400).json(error.message);
        }
    }
    async delete(req, res) {
        const date = date_fns_1.sub(new Date(), { years: 2 });
        await Order_1.default.deleteMany({
            createdAt: { $lte: date },
            closed: true,
        });
        return res.status(200).send();
    }
    async deleteOne(req, res) {
        const { id } = req.params;
        await Order_1.default.deleteOne({ _id: id });
        return res.status(200).send();
    }
}
exports.default = new ReportController();
//# sourceMappingURL=ReportController.js.map
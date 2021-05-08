"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CashRegister_1 = __importDefault(require("../models/CashRegister"));
const date_fns_1 = require("date-fns");
const Order_1 = __importDefault(require("../models/Order"));
const OrderProfitUseCase_1 = require("../UseCases/CashRegister/OrderProfitUseCase");
class CashRegisterController {
    async show(request, response) {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const cashRegister = await CashRegister_1.default.find({
            createdAt: { $gte: initial, $lte: final }
        });
        return response.json(cashRegister);
    }
    async store(request, response) {
        const { thing } = request.body;
        const cashRegister = await CashRegister_1.default.create({
            thing,
            cash: 0,
            closure: 0,
            credit: 0,
            debit: 0,
            exits: [],
        });
        return response.json(cashRegister);
    }
    async updateExits(request, response) {
        const { exits } = request.body;
        const { id } = request.params;
        const cashRegister = await CashRegister_1.default.findByIdAndUpdate({ _id: id }, {
            exits
        }, { new: true });
        if (!cashRegister) {
            return response.status(400).json('That cash register does not exist');
        }
        return response.json(cashRegister);
    }
    async updateClosure(request, response) {
        const { closure } = request.body;
        const { id } = request.params;
        const orderProfitUseCase = new OrderProfitUseCase_1.OrdersProfitUseCase(Order_1.default);
        const results = await orderProfitUseCase.execute();
        const cashRegister = await CashRegister_1.default.findByIdAndUpdate({ _id: id }, {
            debit: results.totalCardDebitFee,
            credit: results.totalCardCreditFee,
            cash: results.total,
            closure
        }, { new: true });
        if (!cashRegister) {
            return response.status(400).json('That cash register does not exist');
        }
        return response.json(cashRegister);
    }
    async delete(req, res) {
        const date = date_fns_1.sub(new Date(), { years: 2 });
        await Order_1.default.deleteMany({
            createdAt: { $lte: date },
        });
        return res.status(200).send();
    }
}
exports.default = new CashRegisterController();
//# sourceMappingURL=CashRegisterController.js.map
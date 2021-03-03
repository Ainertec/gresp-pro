"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldsProductsTotalUseCase = void 0;
const date_fns_1 = require("date-fns");
class SoldsProductsTotalUseCase {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }
    async execute() {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const products = await this.OrderModel.aggregate()
            .match({
            createdAt: { $gte: initial, $lte: final },
            closed: true,
        })
            .unwind('items')
            .lookup({
            from: 'items',
            localField: 'items.product',
            foreignField: '_id',
            as: 'products',
        })
            .unwind('products')
            .group({
            _id: {
                id: '$products._id',
                name: '$products.name',
                description: '$products.description',
                price: '$products.price',
                stock: '$products.stock',
                drink: '$products.drink',
            },
            amount: { $sum: '$items.quantity' },
            soldout: {
                $sum: { $multiply: ['$items.quantity', '$products.price'] },
            },
        })
            .sort({ amount: -1 });
        return products;
    }
    async executeMes() {
        const initial = date_fns_1.startOfDay(new Date());
        const final = date_fns_1.endOfDay(new Date());
        const products = await this.OrderModel.aggregate()
            .match({
            createdAt: { $gte: initial, $lte: final },
            closed: true,
        })
            .unwind('items')
            .lookup({
            from: 'items',
            localField: 'items.product',
            foreignField: '_id',
            as: 'products',
        })
            .unwind('products')
            .group({
            _id: {
                id: '$products._id',
                name: '$products.name',
                description: '$products.description',
                price: '$products.price',
                stock: '$products.stock',
                drink: '$products.drink',
                cost: '$products.cost',
            },
            amount: { $sum: '$items.quantity' },
            soldout: {
                $sum: { $multiply: ['$items.quantity', '$products.price'] },
            },
        })
            .sort({ amount: -1 });
        return products;
    }
}
exports.SoldsProductsTotalUseCase = SoldsProductsTotalUseCase;
//# sourceMappingURL=SoldsProductsTotalUseCase.js.map
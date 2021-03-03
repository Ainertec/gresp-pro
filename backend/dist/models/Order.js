"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const mongoose_1 = require("mongoose");
const Item_1 = __importDefault(require("./Item"));
const subIngredientStock_1 = require("../utils/subIngredientStock");
const ItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    courtesy: {
        type: Boolean,
        default: false,
    },
});
const OrderSchema = new mongoose_1.Schema({
    identification: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    cardfee: {
        type: Number,
    },
    tip: {
        type: Number,
    },
    note: {
        type: String,
    },
    closed: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: String,
        default: null,
    },
    finished: {
        type: Boolean,
        default: false,
    },
    items: [ItemSchema],
}, {
    timestamps: true,
});
OrderSchema.post('findOneAndUpdate', async (document) => {
    if (document && document.items && document.closed) {
        for (const item of document.items) {
            const product = await Item_1.default.findOne({ _id: item.product });
            if (product) {
                if (product.ingredients && product.ingredients.length > 0) {
                    await subIngredientStock_1.subIngredientStock(product.ingredients, item.quantity);
                }
                else if (product.stock) {
                    product.stock -= item.quantity;
                    await product.save();
                }
            }
        }
    }
});
exports.default = mongoose_1.model('Order', OrderSchema);
//# sourceMappingURL=Order.js.map
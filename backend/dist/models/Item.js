"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Category_1 = __importDefault(require("./Category"));
const IngredientSchema = new mongoose_1.Schema({
    material: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ingredient',
    },
    quantity: {
        type: Number,
    },
});
const ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    stock: {
        type: Number,
        default: null,
    },
    drink: {
        type: Boolean,
        default: false,
    },
    available: {
        type: Boolean,
        default: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    ingredients: [IngredientSchema],
}, {
    timestamps: true,
});
ItemSchema.post('deleteOne', document => {
    if (document) {
        const itemId = document._id;
        Category_1.default.find({ products: { $in: [itemId] } }).then(categories => {
            Promise.all(categories.map(category => Category_1.default.findOneAndUpdate({ _id: category._id }, { $pull: { products: itemId } }, { new: true })));
        });
    }
});
exports.default = mongoose_1.model('Item', ItemSchema);
//# sourceMappingURL=Item.js.map
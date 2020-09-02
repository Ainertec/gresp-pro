"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Category_1 = __importDefault(require("./Category"));
var IngredientSchema = new mongoose_1.Schema({
    material: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ingredient',
    },
    quantity: {
        type: Number,
    },
});
var ItemSchema = new mongoose_1.Schema({
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
ItemSchema.post('deleteOne', function (document) {
    if (document) {
        var itemId_1 = document._id;
        Category_1.default.find({ products: { $in: [itemId_1] } }).then(function (categories) {
            Promise.all(categories.map(function (category) {
                return Category_1.default.findOneAndUpdate({ _id: category._id }, { $pull: { products: itemId_1 } }, { new: true });
            }));
        });
    }
});
exports.default = mongoose_1.model('Item', ItemSchema);

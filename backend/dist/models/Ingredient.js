"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
/* eslint-disable no-param-reassign */
const mongoose_1 = require("mongoose");
const Item_1 = __importDefault(require("./Item"));
const getItemsCost_1 = __importDefault(require("../utils/getItemsCost"));
const Unit = Object.freeze({
    kilogram: 'g',
    liter: 'ml',
    unity: 'u',
    getUnit() {
        const unit = [this.kilogram, this.liter, this.unity];
        return unit;
    },
});
exports.Unit = Unit;
const IngredientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    priceUnit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    unit: {
        type: String,
        required: true,
        enum: Object.values(Unit),
    },
    stock: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
Object.assign(IngredientSchema.statics, {
    Unit,
});
IngredientSchema.post('findOneAndUpdate', async (document) => {
    if (document) {
        const ingredientID = document._id;
        const items = await Item_1.default.find({
            'ingredients.material': { $in: ingredientID },
        });
        await Promise.all(items.map(async (item) => {
            if (item.ingredients) {
                const cost = await getItemsCost_1.default(item.ingredients);
                item.cost = cost;
                await item.save();
            }
        }));
    }
});
IngredientSchema.post('findOneAndRemove', async (document) => {
    if (document) {
        const ingredientID = document._id;
        const items = await Item_1.default.find({
            'ingredients.material': { $in: ingredientID },
        });
        await Promise.all(items.map(async (item) => {
            if (item.ingredients) {
                const ingredientUpdated = item.ingredients.filter(ingredient => String(ingredient.material) !== String(ingredientID));
                item.ingredients = ingredientUpdated;
                await item.save();
            }
        }));
    }
});
exports.default = mongoose_1.model('Ingredient', IngredientSchema);
//# sourceMappingURL=Ingredient.js.map
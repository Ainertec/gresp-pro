"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../models/Item"));
const getItemsCost_1 = __importDefault(require("../utils/getItemsCost"));
const Category_1 = __importDefault(require("../models/Category"));
class ItemController {
    async show(req, res) {
        const { page = 1 } = req.query;
        const { name } = req.params;
        const count = await Item_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        }).countDocuments({});
        const items = await Item_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        })
            .skip((Number(page) - 1) * 10)
            .limit(10)
            .populate('ingredients.material');
        res.header('X-Total-Count', String(count));
        return res.json(items);
    }
    async index(req, res) {
        const { page = 1 } = req.query;
        const count = await Item_1.default.countDocuments({});
        const items = await Item_1.default.find()
            .skip((Number(page) - 1) * 10)
            .limit(10)
            .populate('ingredients.material');
        res.header('X-Total-Count', String(count));
        return res.json(items);
    }
    async showDesk(req, res) {
        const { name } = req.params;
        const items = await Item_1.default.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        })
            .populate('ingredients.material');
        return res.json(items);
    }
    async indexDesk(req, res) {
        const items = await Item_1.default.find()
            .populate('ingredients.material');
        return res.json(items);
    }
    async create(req, res) {
        const { name, price, description, stock, drink, ingredients, cost, categoryId, available, } = req.body;
        if (!ingredients && !cost) {
            return res
                .status(400)
                .json('It is necessary to send an ingredients or a cost');
        }
        if (!ingredients && !stock) {
            return res
                .status(400)
                .json('It is necessary to send an ingredients or a stock');
        }
        const itemCost = ingredients ? await getItemsCost_1.default(ingredients) : Number(cost);
        const item = await Item_1.default.create({
            name,
            price,
            description,
            stock: ingredients ? undefined : stock,
            drink,
            cost: Number(itemCost.toFixed(5)),
            ingredients: ingredients || null,
            available,
        });
        if (categoryId) {
            await Category_1.default.findOneAndUpdate({ _id: categoryId }, { $addToSet: { products: item._id } });
        }
        await item.populate('ingredients.material').execPopulate();
        return res.json(item);
    }
    async update(req, res) {
        const { name, price, description, stock, drink, cost, ingredients, categoryId, available, } = req.body;
        const { id } = req.params;
        if (!ingredients && !cost) {
            return res
                .status(400)
                .json('It is necessary to send an ingredients or a cost');
        }
        if (!ingredients && !stock) {
            return res
                .status(400)
                .json('It is necessary to send an ingredients or a stock');
        }
        const itemCost = ingredients ? await getItemsCost_1.default(ingredients) : Number(cost);
        const item = await Item_1.default.findOneAndUpdate({ _id: id }, {
            name,
            price,
            description,
            stock: ingredients ? undefined : stock,
            cost: Number(itemCost.toFixed(5)),
            drink: !!drink,
        }, {
            new: true,
        });
        if (!item)
            return res.status(400).json('Item does not exist');
        if (ingredients) {
            item.ingredients = ingredients;
        }
        if (available !== undefined) {
            item.available = available;
        }
        await item.save();
        if (categoryId) {
            await Category_1.default.findOneAndUpdate({ products: { $in: [item.id] } }, { $pull: { products: item.id } });
            await Category_1.default.findOneAndUpdate({ _id: categoryId }, { $addToSet: { products: item._id } });
        }
        await item.populate('ingredients.material').execPopulate();
        return res.json(item);
    }
    async delete(req, res) {
        const { id } = req.params;
        await Item_1.default.deleteOne({ _id: id });
        return res.status(200).send();
    }
}
exports.default = new ItemController();
//# sourceMappingURL=ItemController.js.map
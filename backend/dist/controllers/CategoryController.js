"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
class CategoryController {
    async index(request, response) {
        const category = await Category_1.default.find({}).populate('products');
        return response.json(category);
    }
    async indexMenu(request, response) {
        const categories = await Category_1.default.find({}).populate('products').lean();
        // const categories = await Category.aggregate()
        //   .lookup({
        //     from: 'items',
        //     localField: 'products',
        //     foreignField: '_id',
        //     as: 'category_products',
        //   })
        //   .unwind('category_products')
        //   .match({ 'category_products.available': true })
        //   .group({
        //     _id: { _id: '$_id', name: '$name', products: '$category_products' },
        //   });
        const categoriesSerializer = categories.map(category => {
            return {
                name: category.name,
                color: category.color,
                _id: category._id,
                products: category.products.filter(product => product.available === true),
            };
        });
        return response.json(categoriesSerializer);
    }
    async show(request, response) {
        const { id } = request.params;
        const category = await Category_1.default.find({ _id: id }).populate('products');
        const categoryProducts = category.map(categoryItem => {
            return categoryItem.products;
        });
        return response.json(categoryProducts[0]);
    }
    async store(request, response) {
        const { name, products, color } = request.body;
        const category = await Category_1.default.create({
            name,
            products,
            color,
        });
        await category.populate('products');
        return response.json(category);
    }
    async update(request, response) {
        const { name, products, color } = request.body;
        const { id } = request.params;
        const category = await Category_1.default.findByIdAndUpdate({ _id: id }, {
            name,
            products,
            color,
        }, { new: true });
        if (!category) {
            return response.status(400).json('That category does not exist');
        }
        category.populate('products');
        return response.json(category);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Category_1.default.deleteOne({ _id: id });
        return response.status(200).send();
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=CategoryController.js.map
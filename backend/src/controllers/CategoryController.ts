import { Request, Response } from 'express';
import Category from '../models/Category';

import { ItemInterface } from '../interfaces/base';

class CategoryController {
  async index(request: Request, response: Response) {
    const category = await Category.find({}).populate('products');
    return response.json(category);
  }
  async indexMenu(request: Request, response: Response) {
    const categories = await Category.find({}).populate('products').lean();
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
        products: category.products.filter(
          product => product.available === true,
        ),
      };
    });

    return response.json(categoriesSerializer);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const category = await Category.find({ _id: id }).populate('products');

    const categoryProducts = category.map(categoryItem => {
      return categoryItem.products;
    });
    return response.json(categoryProducts[0]);
  }

  async store(request: Request, response: Response) {
    const { name, products, color } = request.body;

    const category = await Category.create({
      name,
      products,
      color,
    });
    await category.populate('products');
    return response.json(category);
  }

  async update(request: Request, response: Response) {
    const { name, products, color } = request.body;
    const { id } = request.params;

    const category = await Category.findByIdAndUpdate(
      { _id: id },
      {
        name,
        products,
        color,
      },
      { new: true },
    );
    if (!category) {
      return response.status(400).json('That category does not exist');
    }
    category.populate('products');
    return response.json(category);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await Category.deleteOne({ _id: id });

    return response.status(200).send();
  }
}

export default new CategoryController();

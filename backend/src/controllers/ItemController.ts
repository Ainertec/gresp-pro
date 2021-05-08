import { Request, Response } from 'express';
import Item from '../models/Item';
import getCost from '../utils/getItemsCost';
import Category from '../models/Category';

class ItemController {
  public async show(req: Request, res: Response) {
    const { page = 1 } = req.query;
    const { name } = req.params;

    const count = await Item.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    }).countDocuments({});
    const items = await Item.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    })
      .skip((Number(page) - 1) * 10)
      .limit(10)
      .populate('ingredients.material');

    res.header('X-Total-Count', String(count));

    return res.json(items);
  }

  public async index(req: Request, res: Response) {
    const { page = 1 } = req.query;

    const count = await Item.countDocuments({});

    const items = await Item.find()
      .skip((Number(page) - 1) * 10)
      .limit(10)
      .populate('ingredients.material');

    res.header('X-Total-Count', String(count));

    return res.json(items);
  }

  public async showDesk(req: Request, res: Response) {
    const { name } = req.params;

    const items = await Item.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    })
      .populate('ingredients.material');

    return res.json(items);
  }

  public async indexDesk(req: Request, res: Response) {
    const items = await Item.find()
      .populate('ingredients.material');

    return res.json(items);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      price,
      description,
      print,
      stock,
      drink,
      ingredients,
      cost,
      categoryId,
      available,
    } = req.body;

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

    const itemCost = ingredients ? await getCost(ingredients) : Number(cost);

    const item = await Item.create({
      name,
      price,
      description,
      stock: ingredients ? undefined : stock,
      drink,
      cost: Number(itemCost.toFixed(5)),
      ingredients: ingredients || null,
      available,
      print
    });

    if (categoryId) {
      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $addToSet: { products: item._id } },
      );
    }
    await item.populate('ingredients.material').execPopulate();
    return res.json(item);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      name,
      price,
      description,
      stock,
      drink,
      cost,
      ingredients,
      categoryId,
      available,
      print
    } = req.body;
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

    const itemCost = ingredients ? await getCost(ingredients) : Number(cost);

    const item = await Item.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        description,
        stock: ingredients ? undefined : stock,
        cost: Number(itemCost.toFixed(5)),
        drink: !!drink,
        print
      },
      {
        new: true,
      },
    );
    if (!item) return res.status(400).json('Item does not exist');

    if (ingredients) {
      item.ingredients = ingredients;
    }
    if (available !== undefined) {
      item.available = available;
    }
    await item.save();

    if (categoryId) {
      await Category.findOneAndUpdate(
        { products: { $in: [item.id] } },
        { $pull: { products: item.id } },
      );

      await Category.findOneAndUpdate(
        { _id: categoryId },
        { $addToSet: { products: item._id } },
      );
    }

    await item.populate('ingredients.material').execPopulate();

    return res.json(item);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await Item.deleteOne({ _id: id });

    return res.status(200).send();
  }
}

export default new ItemController();

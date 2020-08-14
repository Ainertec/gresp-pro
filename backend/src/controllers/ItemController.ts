import { Request, Response } from 'express';
import Item from '../models/Item';
import getCost from '../utils/getItemsCost';

class ItemController {
  public async show(req: Request, res: Response) {
    const { page = 1 } = req.query;
    const { name } = req.params;

    const count = await Item.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    }).countDocuments({});
    const items = await Item.find({ name: { $regex: new RegExp(name), $options: 'i' } })
      .skip((Number(page) - 1) * 10)
      .limit(10);

    res.header('X-Total-Count', String(count));

    return res.json(items);
  }
  public async index(req: Request, res: Response) {
    const { page = 1 } = req.query;

    const count = await Item.countDocuments({});

    const items = await Item.find()
      .skip((Number(page) - 1) * 10)
      .limit(10);

    res.header('X-Total-Count', String(count));

    return res.json(items);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, description, stock, drink, ingredients, cost } = req.body;

    if (!ingredients && !cost) {
      return res.status(400).json('It is necessary to send an ingredients or a cost');
    }
    if (!ingredients && !stock) {
      return res.status(400).json('It is necessary to send an ingredients or a stock');
    }

    const itemCost = ingredients ? await getCost(ingredients) : Number(cost);

    const item = await Item.create({
      name,
      price,
      description,
      stock: ingredients ? undefined : stock,
      drink,
      cost: itemCost,
      ingredients: ingredients ? ingredients : undefined,
    });

    return res.json(item);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, description, stock, drink, cost, ingredients } = req.body;
    const id = req.params.id;

    if (!ingredients && !cost) {
      return res.status(400).json('It is necessary to send an ingredients or a cost');
    }
    if (!ingredients && !stock) {
      return res.status(400).json('It is necessary to send an ingredients or a stock');
    }

    const itemCost = ingredients ? await getCost(ingredients) : Number(cost);

    const item = await Item.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        description,
        stock: ingredients ? undefined : stock,
        cost: itemCost,
        drink: drink ? true : false,
      },
      {
        new: true,
      }
    );
    if (!item) return res.status(400).json('Item does not exist');
    if (ingredients) {
      item.ingredients = ingredients;
    }
    await item.save();

    item.populate('ingredients.material');

    return res.json(item);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await Item.deleteOne({ _id: id });

    return res.status(200).send();
  }
}

export default new ItemController();

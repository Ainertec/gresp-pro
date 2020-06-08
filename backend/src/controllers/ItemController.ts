import { Request, Response } from 'express';
import Item from '../models/Item';

class ItemController {
  public async show(req: Request, res: Response) {
    const name: string = req.params.name;

    const items = await Item.find({ name: { $regex: new RegExp(name), $options: 'i' } });

    return res.json(items);
  }
  public async index(req: Request, res: Response) {
    const items = await Item.find();

    return res.json(items);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, description, stock, drink } = req.body;

    const item = await Item.create({
      name,
      price,
      description,
      stock,
      drink,
    });

    return res.json(item);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, description, stock, drink } = req.body;
    const id = req.params.id;

    const item = await Item.findOneAndUpdate(
      { _id: id },
      {
        name,
        price,
        description,
        stock,
        drink: drink ? true : false,
      },
      {
        new: true,
      }
    );
    if (!item) return res.status(400).json('Item does not exist');
    return res.json(item);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await Item.deleteOne({ _id: id });

    return res.status(200).send();
  }
}

export default new ItemController();

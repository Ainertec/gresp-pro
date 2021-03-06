/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import User, { Questions } from '../models/User';

interface CustomRequest extends Request {
  [userId: string]: any;
}

class UserController {
  public async getQuestions(req: Request, res: Response): Promise<Response> {
    const questions = Questions.getQuestions();
    return res.json(questions);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find();

    const serializedUsers = users.map(user => {
      return {
        ...user.toObject(),
        password_hash: undefined,
      };
    });

    return res.json(serializedUsers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { name } = req.params;
    const users = await User.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    const serializedUser = users.map(user => {
      return {
        ...user.toObject(),
        password_hash: undefined,
      };
    });

    return res.json(serializedUser);
  }

  public async create(req: CustomRequest, res: Response): Promise<Response> {
    const { admin, name, question, password, response } = req.body;

    const { userId } = req;

    const isValidQuestion = Questions.getQuestions().includes(question);

    if (!isValidQuestion) {
      return res.status(400).json({ message: 'invalid question' });
    }

    const authUser = await User.findOne({ _id: userId });

    const existUserName = await User.findOne({ name });

    if (existUserName) {
      return res.status(400).json('name already exist');
    }

    const user = await User.create({
      name,
      password,
      question,
      response,
      admin: authUser?.admin ? admin : false,
    });

    return res.json(user);
  }

  public async store(req: CustomRequest, res: Response): Promise<Response> {
    const { question, name, password, response, admin } = req.body;
    // const userId = req.userId;

    const isValidQuestion = Questions.getQuestions().includes(question);

    if (!isValidQuestion) {
      return res.status(400).json({ message: 'invalid question' });
    }

    // const authUser = await User.findOne({ _id: userId });

    const existUserName = await User.findOne({ name });

    if (existUserName) {
      return res.status(400).json('name already exist');
    }

    const user = await User.create({
      name,
      password,
      question,
      response,
      admin,
    });

    return res.json(user);
  }

  public async update(req: CustomRequest, res: Response): Promise<Response> {
    const { question, name, password, response, admin } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const isValidQuestion = Questions.getQuestions().includes(question);

    if (!isValidQuestion) {
      return res.status(400).json({ message: 'invalid question' });
    }

    if (name) {
      const nameAlreadyExist = await User.findOne({ name });
      if (nameAlreadyExist) {
        return res.status(400).json('The name already been used');
      }
    }
    const authUser = await User.findOne({ _id: userId });
    if (authUser?.admin || userId === id) {
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          question,
          response,
          admin: authUser?.admin ? admin : false,
        },
        {
          new: true,
        },
      );

      if (name && user) {
        user.name = name;
      }
      if (password && user) {
        user.password = password;
      }
      if (user) await user.save();
      return res.json(user);
    }
    return res.status(401).json({ message: 'You do not have permission' });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await User.deleteOne({ _id: id });

    return res.status(200).send();
  }
}

export default new UserController();

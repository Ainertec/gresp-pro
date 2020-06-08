import { Request, Response } from 'express';
import User from '../models/User';

class ForgotPasswordController {
  public async show(req: Request, res: Response) {
    const { name } = req.query;

    const user = await User.findOne({ name: String(name) });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    return res.status(200).json({ question: user.question });
  }

  public async store(req: Request, res: Response) {
    const { name, response, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    if (response !== user.response) {
      return res.status(401).json({ message: 'Incorret response' });
    }

    user.password = password;

    await user.save();

    return res.status(200).send();
  }
}

export default new ForgotPasswordController();

import { Request, Response } from 'express';
import User from '../models/User';

class SessionController {
  public async create(request: Request, response: Response) {
    const { name, password } = request.body;

    const user = await User.findOne({ name });

    if (!user) {
      return response.status(401).json('user does not exist');
    }
    const correctPassword = await user.checkPassword(password);

    if (!correctPassword) {
      return response.status(401).json('incorrect password');
    }
    const token = user.generateToken();

    const serializedUser = {
      ...user.toObject(),
      password_hash: undefined,
      response: undefined,
    };
    return response.json({
      user: serializedUser,
      token,
    });
  }
}

export default new SessionController();

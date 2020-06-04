import { Request, Response } from 'express';
import User from '../models/User';

class SessionController {
  public async create(request: Request, response: Response) {
    const { name, password } = request.body;

    const user = await User.findOne({ name });

    if (user) {
      const correctPassword = await user.checkPassword(password);

      if (correctPassword) {
        return response.json(user);
      } else {
        return response.status(401).json('incorrent password');
      }
    }

    return response.status(401).json('user does not exist');
  }
}

export default new SessionController();

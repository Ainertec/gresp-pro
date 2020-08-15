/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

interface CustomRequest extends Request {
  [userId: string]: any;
}

class Authentication {
  public async auth(
    request: CustomRequest,
    response: Response,
    next: NextFunction,
  ) {
    const { userId } = request;

    const user = await User.findOne({ _id: userId });

    if (!user?.admin) {
      return response.status(401).json('Restrict area');
    }

    next();
  }
}

export default new Authentication().auth;

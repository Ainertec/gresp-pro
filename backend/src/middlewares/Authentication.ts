/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Request, Response, NextFunction } from 'express';

interface VerifyResponse {
  id: string;
}
interface CustomRequest extends Request {
  [userId: string]: any;
}

class Authentication {
  public async auth(
    request: CustomRequest,
    response: Response,
    next: NextFunction,
  ) {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      return response.status(401).json({ message: 'Token not provider' });
    }
    const [, token] = authHeaders.split(' ');

    try {
      const decoded = (await promisify(jwt.verify)(
        token,
        String(process.env.APP_SECRET),
      )) as VerifyResponse;

      request.userId = decoded.id;
      return next();
    } catch (error) {
      return response.status(401).json({ message: 'Token invalid' });
    }
  }
}

export default new Authentication().auth;

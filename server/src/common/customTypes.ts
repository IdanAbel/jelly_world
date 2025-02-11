import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/userModel';

export interface CustomRequest extends Request {
  user?: {
    _id?: string;
    name?: string;
    email?: string;
  } | IUser;
}

export const customAsyncHandler = <
  Req extends Request = Request,
  Res extends Response = Response
>(
  fn: (req: Req, res: Res, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as Req, res as Res, next)).catch(next);
  };
};

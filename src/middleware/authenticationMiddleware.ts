import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import { Configs } from '../configs/constants';

const mySecret = Configs.auth.jwtSecret;

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const authenticationMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Authentication failed');

    const decoded: any = jwt.verify(token, mySecret);
    const user = await UserModel.findById(decoded.userId);
    if (!user) throw new Error('User not found');

    req.user = { userId: user._id };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export default authenticationMiddleware;
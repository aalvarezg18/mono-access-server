import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import NotAuthorizedError from '../errors/not-authorized.error';
import BadRequestError from '../errors/bad-request.error';

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new NotAuthorizedError();
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = <IUser>jwt.verify(token, process.env.JWT_KEY!);
    req.currentUser = payload;
  } catch (error) {
    throw new BadRequestError(
      'Session expired or not found. Please login again'
    );
  }
  next();
};

export default currentUser;

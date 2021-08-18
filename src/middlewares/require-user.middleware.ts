import { Request, Response, NextFunction } from 'express';
import { db } from '../utils/prisma.util';
import errors from '../errors';

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) throw new errors.NotAuthorizedError();
  const { id } = req.currentUser;
  const user = await db.users.findUnique({
    where: { id }
  });
  if (!user || user.deleted) throw new errors.NotFoundError();
  if (user.status_id !== 1) throw new errors.BadRequestError('User inactive');
  next();
};

export default requireUser;

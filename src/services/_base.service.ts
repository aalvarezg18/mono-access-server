import { PrismaClient } from '@prisma/client';
import { db } from '../utils/prisma.util';

abstract class BaseService {
  protected db: PrismaClient = db;
  // eslint-disable-next-line no-useless-constructor
  constructor () {}
}

export default BaseService;

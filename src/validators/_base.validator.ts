import { PrismaClient } from '@prisma/client';
import { db } from '../utils/prisma.util';

abstract class BaseValidator {
  protected db: PrismaClient = db;
  // eslint-disable-next-line no-useless-constructor
  constructor () {}
}

export default BaseValidator;

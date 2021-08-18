import { Request, Response, NextFunction } from 'express';
import { body, param, query } from 'express-validator';
import BadRequestError from '../errors/bad-request.error';
import NotFoundError from '../errors/not-found.error';
import BaseValidator from './_base.validator';

class KeysValidator extends BaseValidator {}

export default KeysValidator;

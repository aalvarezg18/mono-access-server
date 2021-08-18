import { Router } from 'express';
import middlewares from '../middlewares';
import KeysValidator from '../validators/keys.validator';
import KeysController from '../controllers/keys.controller';

const controller = new KeysController();
const validator = new KeysValidator();
const router = Router();

// GET - Get all

// GET - Get one

// GET - Get apply filters

// POST - Create

// PUT - Update

// DELETE - Delete logic

// DELETE - Remove from db

export default router;

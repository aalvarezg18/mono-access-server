import { Router } from 'express';
import middlewares from '../middlewares';
import UsersValidator from '../validators/users.validator';
import UsersController from '../controllers/users.controller';

const controller = new UsersController();
const validator = new UsersValidator();
const router = Router();

// GET - Get user info by id
router.get(
  '/',
  middlewares.currentUser,
  middlewares.requireUser,
  controller.getOne
);

// POST - Create user
router.post(
  '/',
  validator.validateCreateFields,
  middlewares.validateRequest,
  validator.validateIfUserExist,
  controller.create
);

// PUT - Confirm user
router.get(
  '/confirmation/:token',
  validator.validateConfirmEmailFields,
  middlewares.validateRequest,
  controller.enable
);

// POST - Login user
router.post(
  '/login',
  validator.validateLoginFields,
  middlewares.validateRequest,
  validator.validateUserCredentials,
  controller.login
);

// PUT - Update user
router.put(
  '/',
  middlewares.currentUser,
  middlewares.requireUser,
  validator.validateEditFields,
  middlewares.validateRequest,
  controller.update
);

// PUT - Restore password
router.put(
  '/restore-password',
  middlewares.currentUser,
  middlewares.requireUser,
  validator.validatePassword,
  middlewares.validateRequest,
  controller.restorePassword
);

// DELETE - Logic delete user
router.delete(
  '/',
  middlewares.currentUser,
  middlewares.requireUser,
  middlewares.validateRequest,
  controller.delete
);

export default router;

import errorHandler from './errorHandler.middleware';
import validateRequest from './validate-request.middleware';
import currentUser from './current-user.middleware';
import requireUser from './require-user.middleware';

export default {
  errorHandler,
  validateRequest,
  currentUser,
  requireUser
};

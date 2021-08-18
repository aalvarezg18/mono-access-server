import CustomError from './custom.error';

class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor () {
    super('not authorized');
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors = () => [{ message: 'not authorized' }];
}

export default NotAuthorizedError;

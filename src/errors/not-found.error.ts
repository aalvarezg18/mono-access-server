import CustomError from './custom.error';

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor () {
    super('Not Found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors = () => [{ message: 'Not Found' }];
}

export default NotFoundError;

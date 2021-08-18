import CustomError from './custom.error';
export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor (public message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors = () => [{ message: this.message }];
}

export default ForbiddenError;

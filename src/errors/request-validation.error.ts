import { ValidationError } from 'express-validator';
import CustomError from './custom.error';

class RequestValidationError extends CustomError {
  statusCode = 400;
  errors: ValidationError[];
  constructor (errorIn: ValidationError[]) {
    super('Invalid Parameters');
    this.errors = errorIn;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors = () =>
    this.errors.map((error) => {
      const errString = <string>error.msg.toString();
      return { message: errString, field: error.param };
    });
}

export default RequestValidationError;

import { CommonErrorStructure, CustomError } from './interfaces/common-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Resource not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): CommonErrorStructure[] {
    return [
      {
        message: 'Not Found',
      },
    ];
  }
}

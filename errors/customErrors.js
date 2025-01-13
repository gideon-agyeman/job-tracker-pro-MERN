import { StatusCodes } from 'http-status-codes';

export class NOTFOUND extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BADREQUEST extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UNAUTHORIZED extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
export class UNAUTHENTICATED extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthenticated';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

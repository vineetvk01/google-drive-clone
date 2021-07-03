import ApplicationError from './application-error';

export default class UnauthorizedRequest extends ApplicationError {
  constructor(message, code) {
    super(message || 'Unauthorized', code || 401);
  }
}

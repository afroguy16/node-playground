interface ErrorObject {
  path: string;
  message: string;
}

export class ErrorService {
  private _errors: Array<ErrorObject> = [];

  constructor(req) {
    req.validator = this;
  }

  getErrors() {
    return this._errors;
  }

  setError(path: string, message: string) {
    return this._errors.push({ path, message });
  }

  clearErrors() {
    this._errors = [];
  }

  hasError() {
    return this._errors.length > 0;
  }
}

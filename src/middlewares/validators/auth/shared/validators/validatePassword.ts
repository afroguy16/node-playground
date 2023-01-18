import validator from "validator";

import {
  PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  PASSWORD_LENGTH,
} from "../../constants";

export default (req) => {
  const password = req.body.password;
  const path = "password";

  if (!password) {
    req.validator.setError(path, PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT);
    return false;
  }

  if (!validator.isLength(password, { min: PASSWORD_LENGTH })) {
    req.validator.setError(path, PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT);
    return false;
  }

  return true;
};

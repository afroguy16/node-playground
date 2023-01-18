import validator from "validator";

import {
  USERNAME_ERROR_INVALID_TYPE,
  USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS,
  USERNAME_LENGTH,
} from "../../constants";
import isUsernameUnique from "../custom-validators/isUsernameUnique";

export default async (req) => {
  const username = req.body.username;
  const path = "username";

  if (!username) {
    req.validator.setError(path, USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT);
    return false;
  }

  if (!validator.isLength(username, { min: USERNAME_LENGTH })) {
    req.validator.setError(path, USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT);
    return false;
  }

  if (!validator.isAlphanumeric(username)) {
    req.validator.setError(path, USERNAME_ERROR_INVALID_TYPE);
    return false;
  }

  if (!(await isUsernameUnique(username))) {
    req.validator.setError(path, USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS);
    return false;
  }

  return true;
};

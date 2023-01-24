import validator from "validator";

import {
  USERNAME_ERROR_INVALID_TYPE,
  USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS,
  USERNAME_LENGTH,
} from "../../constants";
import isUsernameUnique from "../custom-validators/isUsernameUnique";

export default async (username: string) => {
  const errors: Array<string> = [];

  if (!username || !validator.isLength(username, { min: USERNAME_LENGTH })) {
    errors.push(USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT);
    return errors;
  }

  if (!validator.isAlphanumeric(username)) {
    errors.push(USERNAME_ERROR_INVALID_TYPE);
    return errors;
  }

  if (!(await isUsernameUnique(username))) {
    errors.push(USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS);
  }

  return errors;
};

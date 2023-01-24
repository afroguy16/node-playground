import validator from "validator";

import User from "../../../../../../models/User";

import {
  USERNAME_ERROR_INVALID_TYPE,
  USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS,
  USERNAME_LENGTH,
} from "../../../constants";

/**
 * Get the compliance errors of a given username against a set of defined validation rules
 *
 * @param {string} username - The username value to test
 * @returns {Array<String>}
 */
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

  const user = await User.get({ username });
  if (user) {
    errors.push(USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS);
  }

  return errors;
};

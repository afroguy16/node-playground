import validator from "validator";

import {
  PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  PASSWORD_LENGTH,
} from "../../constants";

/**
 * Get the compliance errors of a given password against a set of defined validation rules
 *
 * @param {string} password - The password value to test
 * @returns {Array<String>}
 */
export default (password: string): Array<string> => {
  if (!password || !validator.isLength(password, { min: PASSWORD_LENGTH })) {
    return [PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT];
  }
  return [];
};

import validator from "validator";
import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
  EMAIL_UNACCEPTABLE_ADDRESSES,
} from "../../auth/constants";

/**
 * Get the compliance errors of a given email against a set of defined validation rules
 *
 * @param {string} email - The email value to test
 * @returns {Array<String>}
 */
export default (email: string): Array<string> => {
  const errors: Array<string> = [];
  if (!email || !validator.isEmail(email)) {
    errors.push(EMAIL_ERROR_MESSAGE_INVALID_TYPE);
  }

  if (EMAIL_UNACCEPTABLE_ADDRESSES.includes(email)) {
    errors.push(EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS);
  }

  return errors;
};

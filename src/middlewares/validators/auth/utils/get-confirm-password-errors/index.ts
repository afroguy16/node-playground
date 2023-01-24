import {
  CONFIRM_PASSWORD_ERROR_MISMATCHED,
  CONFIRM_PASSWORD_ERROR_SHORT_LENGTH,
} from "../../constants";

/**
 * Get the compliance errors of a given confirm password and password against a set of defined validation rules
 *
 * @param {string} confirmPassword - The confirm password value to test
 * @param {string} password - The password to be tested against
 * @returns {Array<String>}
 */
export default (confirmPassword: string, password: string): Array<string> => {
  const errors: Array<string> = [];

  if (!confirmPassword) {
    errors.push(CONFIRM_PASSWORD_ERROR_SHORT_LENGTH);
  }

  if (confirmPassword !== password) {
    errors.push(CONFIRM_PASSWORD_ERROR_MISMATCHED);
  }

  return errors;
};

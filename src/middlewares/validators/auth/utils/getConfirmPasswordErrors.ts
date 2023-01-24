import {
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  CONFIRM_PASSWORD_ERROR_MESSAGE_EMPTY,
} from "../constants";

export default (confirmPassword, password) => {
  const errors: Array<string> = [];

  if (!confirmPassword) {
    errors.push(CONFIRM_PASSWORD_ERROR_MESSAGE_EMPTY);
  }

  if (confirmPassword !== password) {
    errors.push(CONFIRM_PASSWORD_ERROR_MESSAGE);
  }

  return errors;
};

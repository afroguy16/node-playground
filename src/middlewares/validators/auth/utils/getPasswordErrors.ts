import validator from "validator";

import {
  PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  PASSWORD_LENGTH,
} from "../constants";

export default (password: string) =>
  validator.isLength(password, { min: PASSWORD_LENGTH })
    ? []
    : [PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT];

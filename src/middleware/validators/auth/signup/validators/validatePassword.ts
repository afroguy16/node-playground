import { body } from "express-validator";

import {
  PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  PASSWORD_LENGTH,
} from "../constants";

export default () => {
  return body("password", PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT)
    .isLength({ min: PASSWORD_LENGTH })
    .isAlphanumeric();
};

import { body } from "express-validator";

import {
  USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  USERNAME_LENGTH,
} from "../constants";

export default () => {
  return body("username", USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT)
    .isLength({ min: USERNAME_LENGTH })
    .isAlphanumeric();
};

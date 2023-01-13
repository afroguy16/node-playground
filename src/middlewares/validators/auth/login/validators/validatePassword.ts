import { body } from "express-validator";
import { LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS } from "../../constants";
import isMatachedUserPassword from "../custom-validators/isMatachedUserPassword";

export default () => {
  return body("password", LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS).custom(
    (password, { req }) => isMatachedUserPassword(password, req)
  );
};

import { body } from "express-validator";
import { LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS } from "../../constants";
import isMatchedUserPassword from "../custom-validators/isMatchedUserPassword";

export default () => {
  return body("password", LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS).custom(
    (password, { req }) => isMatchedUserPassword(password, req)
  );
};

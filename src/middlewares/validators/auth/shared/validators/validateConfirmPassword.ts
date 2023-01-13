import { body } from "express-validator";

import { CONFIRM_PASSWORD_ERROR_MESSAGE } from "../../constants";
import isPasswordMatched from "../custom-validators/isPasswordMatched";

export default () => {
  return body("confirmPassword", CONFIRM_PASSWORD_ERROR_MESSAGE).custom(
    (value, { req }) => isPasswordMatched(value, req)
  );
};

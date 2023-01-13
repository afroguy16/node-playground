import { body } from "express-validator";

import { EMAIL_ERROR_MESSAGE_INVALID_TYPE } from "../../constants";
import isUserEmail from "../../shared/custom-validators/isUserEmail";

export default () => {
  return body("email")
    .isEmail()
    .withMessage(EMAIL_ERROR_MESSAGE_INVALID_TYPE)
    .custom((email, { req }) => isUserEmail(email, req));
};

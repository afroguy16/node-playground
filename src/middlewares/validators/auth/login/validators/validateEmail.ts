import { body } from "express-validator";
import { EMAIL_ERROR_MESSAGE_INVALID_TYPE } from "../../constants";
import isMatchedUserEmail from "../custom-validators/isMatchedUserEmail";

export default () => {
  return body("email", EMAIL_ERROR_MESSAGE_INVALID_TYPE)
    .isEmail()
    .custom((email, { req }) => isMatchedUserEmail(email, req));
};

import { body } from "express-validator";

import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
  EMAIL_UNACCEPTABLE_ADDRESSES,
} from "../../constants";
import isAcceptedEmailAddress from "../custom-validators/isAcceptedEmailAddress";
import isEmailUnique from "../custom-validators/isEmailUnique";

export default () => {
  return body("email")
    .isEmail()
    .withMessage(EMAIL_ERROR_MESSAGE_INVALID_TYPE)
    .custom((email) =>
      isAcceptedEmailAddress(
        email,
        EMAIL_UNACCEPTABLE_ADDRESSES,
        EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS
      )
    )
    .custom(async (email: string) => isEmailUnique(email));
};

import { body } from "express-validator";

import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
  EMAIL_UNACCEPTABLE_ADDRESS,
} from "../constants";
import isAcceptedEmailAddress from "../custom-validators/isAcceptedEmailAddress";
import isEmailUnique from "../custom-validators/isEmailUnique";

export default () => {
  return body("email", EMAIL_ERROR_MESSAGE_INVALID_TYPE)
    .isEmail()
    .custom((email) =>
      isAcceptedEmailAddress(
        email,
        EMAIL_UNACCEPTABLE_ADDRESS,
        EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS
      )
    )
    .custom(async (email: string) => isEmailUnique(email));
};

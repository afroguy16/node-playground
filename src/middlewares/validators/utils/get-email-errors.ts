import validator from "validator";
import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
  EMAIL_UNACCEPTABLE_ADDRESSES,
} from "../auth/constants";

import isAcceptedEmailAddress from "../auth/shared/custom-validators/isAcceptedEmailAddress";

export default (email: string) => {
  const errors: Array<string> = [];
  if (!email || !validator.isEmail(email)) {
    errors.push(EMAIL_ERROR_MESSAGE_INVALID_TYPE);
  }

  if (!isAcceptedEmailAddress(email, EMAIL_UNACCEPTABLE_ADDRESSES)) {
    errors.push(EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS);
  }

  return errors;
};

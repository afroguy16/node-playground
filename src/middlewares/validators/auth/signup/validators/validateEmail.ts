import validator from "validator";

import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
  EMAIL_UNACCEPTABLE_ADDRESSES,
  EMAIL_UNAVAILABLE_ADDRESS,
} from "../../constants";
import isAcceptedEmailAddress from "../../shared/custom-validators/isAcceptedEmailAddress";
import isEmailUnique from "../custom-validators/isEmailUnique";

export default (req) => {
  const email = req.body.email;
  const path = "email";

  if (!email) {
    req.validator.setError(path, EMAIL_ERROR_MESSAGE_INVALID_TYPE);
    return false;
  }

  if (!validator.isEmail(email)) {
    req.validator.setError(path, EMAIL_ERROR_MESSAGE_INVALID_TYPE);
    return false;
  }

  if (!isAcceptedEmailAddress(email, EMAIL_UNACCEPTABLE_ADDRESSES)) {
    req.validator.setError(path, EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS);
    return false;
  }

  // if (!(await isEmailUnique(email))) {
  //   req.validator.setError(path, EMAIL_UNAVAILABLE_ADDRESS);
  //   return false;
  // }

  return true;
};

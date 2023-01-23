import User from "../../../../../models/User";

import getEmailErrors from "../../../utils/get-email-errors";
import { REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND } from "../../constants";

export default async (email: string) => {
  const errors: Array<string> = [];

  errors.push(...getEmailErrors(email));

  if (errors.length > 0) {
    return errors;
  }

  // check if there is a user with this email
  const user = await User.get({ email });
  if (!user) {
    errors.push(REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND);
  }

  return errors;
};

import { Request } from "express-validator/src/base";

import User from "../../../../../models/User";
import { RESET_PASSWORD_UNMATCHED_EMAIL } from "../../constants";

export default async (email, req: Request) => {
  const userId = req.session?.resetPasswordTokenObject?.userId;

  // all console.log is for dev purpose only - nothing is sent to the user, express validator is good with a false boolean
  // no error is throw because express-validator will send the errors to the user, we do not want the user to be aware if token data is invalid for security reasons
  if (!userId) {
    console.log("You need to pass a user ID");
    return false;
  }

  const user = await User.get({ _id: userId });

  if (user?.email === email) {
    req.session.resetPasswordUser = user;
    return true;
  }

  console.log(RESET_PASSWORD_UNMATCHED_EMAIL);
  return false;
};

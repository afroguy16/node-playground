import { Request } from "express-validator/src/base";

import ResetPasswordToken from "../../../../../models/ResetPasswordToken";
import { RESET_PASSWORD_TOKEN_UNAVAILABLE } from "../../constants";

export default async (token: string, req: Request) => {
  const tokenObject = await ResetPasswordToken.get(token);

  if (tokenObject) {
    req.session.resetPasswordTokenObject = tokenObject;
    return true;
  }

  // Log out for development purpose - this isn't sent to the user
  console.log(RESET_PASSWORD_TOKEN_UNAVAILABLE);

  return false;
};

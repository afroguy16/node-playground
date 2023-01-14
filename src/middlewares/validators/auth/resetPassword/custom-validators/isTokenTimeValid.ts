import { Request } from "express-validator/src/base";
import ResetPasswordToken from "../../../../../models/ResetPasswordToken";

export default (req: Request) => {
  const isTokenTimeValid = Boolean(
    req.session.resetPasswordTokenObject.expiration > Date.now()
  );
  if (!isTokenTimeValid) {
    ResetPasswordToken.delete(req.session.resetPasswordTokenObject._id);
    return false;
  }
  return true;
};

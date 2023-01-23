import validateEmail from "./validators/validateEmail";
import validatePassword from "../utils/getPasswordErrors";
import validateUsername from "./validators/validateUsername";
import { ErrorService } from "../../ErrorService";
import getConfirmPasswordErrors from "../utils/getConfirmPasswordErrors";

export default async (req, res, next?) => {
  // Initialize ErrorService instance
  new ErrorService(req);

  // call validators
  await validateUsername(req);
  await validateEmail(req);
  validatePassword(req); // TODO - update signupValidators to comply with the new style
  getConfirmPasswordErrors(req.body.confirmPassword, req.body.password); // TODO - update signupValidators to comply with the new style

  // call next after all validator has been called
  next && next();
};

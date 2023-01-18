import validateConfirmPassword from "../shared/validators/validateConfirmPassword";
import validateEmail from "./validators/validateEmail";
import validatePassword from "../shared/validators/validatePassword";
import validateUsername from "./validators/validateUsername";
import { ErrorService } from "../../ErrorService";

export default async (req, res, next) => {
  // Initialize ErrorService instance
  new ErrorService(req);

  // call validators
  await validateUsername(req);
  await validateEmail(req);
  validatePassword(req);
  validateConfirmPassword(req);

  // call next after all validator has been called
  next();
};

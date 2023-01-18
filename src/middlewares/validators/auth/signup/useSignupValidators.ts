import validateConfirmPassword from "../shared/validators/validateConfirmPassword";
import validateEmail from "./validators/validateEmail";
import validatePassword from "../shared/validators/validatePassword";
import validateUsername from "./validators/validateUsername";
import { ErrorService } from "../../ErrorService";
import { USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT } from "../constants";

export default async (req, res, next) => {
  new ErrorService(req);
  req.validator.clearErrors();
  await validateUsername(req);
  next();
};

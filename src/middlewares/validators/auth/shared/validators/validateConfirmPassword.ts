import {
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  CONFIRM_PASSWORD_ERROR_MESSAGE_EMPTY,
} from "../../constants";
import isPasswordMatched from "../custom-validators/isPasswordMatched";

export default (req) => {
  const confirmPassword = req.body.confirmPassword;
  const path = "confirmPassword";

  if (!confirmPassword) {
    req.validator.setError(path, CONFIRM_PASSWORD_ERROR_MESSAGE_EMPTY);
    return false;
  }

  if (!isPasswordMatched(confirmPassword, req)) {
    req.validator.setError(path, CONFIRM_PASSWORD_ERROR_MESSAGE);
    return false;
  }
};

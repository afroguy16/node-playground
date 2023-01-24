import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/utils/constants";

import packageErrors from "../../../utils/package-errors";

import getEmailErrors from "../../utils/getEmailErrors";
import getPasswordErrors from "../../utils/get-password-errors";
import getConfirmPasswordErrors from "../../utils/getConfirmPasswordErrors";
import getTokenErrors from "../../utils/getTokenErrors";

export default async (req, res, next) => {
  const { email, password, confirmPassword, token } = req?.body;
  const emailPath = "email";
  const passwordPath = "password";
  const confirmPasswordPath = "confirmPassword";
  const tokenPath = "token";
  const errors: Array<{ path: string; message: string }> = [];

  const emailErrors = await getEmailErrors(email);
  if (emailErrors.length > 0) {
    errors.push(...packageErrors(emailPath, emailErrors));
  }

  const passwordErrors = getPasswordErrors(password);
  if (passwordErrors.length > 0) {
    errors.push(...packageErrors(passwordPath, passwordErrors));
  }

  const confirmPasswordErrors = getConfirmPasswordErrors(
    password,
    confirmPassword
  );
  if (confirmPasswordErrors.length > 0) {
    errors.push(...packageErrors(confirmPasswordPath, confirmPasswordErrors));
  }

  const tokenErrors = await getTokenErrors(token, email);
  if (tokenErrors.length > 0) {
    errors.push(...packageErrors(tokenPath, tokenErrors));
  }

  if (errors.length > 0) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors);
  }

  next();
};

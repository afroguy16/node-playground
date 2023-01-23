import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/constants";

import getEmailErrors from "../../utils/getEmailErrors";
import getPasswordErrors from "../../utils/getPasswordErrors";
import getConfirmPasswordErrors from "../../utils/getConfirmPasswordErrors";
import getTokenErrors from "../../utils/getTokenErrors";

const packageErrors = (path: string, errors: Array<string>) => {
  const mem: Array<{ path: string; message: string }> = [];
  errors.forEach((error) => mem.push({ path, message: error }));
  return mem;
};

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

  const passwordErrors = getPasswordErrors(email);
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

  const tokenErrors = await getTokenErrors(token);
  if (tokenErrors.length > 0) {
    errors.push(...packageErrors(tokenPath, tokenErrors));
  }

  if (errors.length > 0) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors);
  }

  next();
};

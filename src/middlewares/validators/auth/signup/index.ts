import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../controllers/utils/constants";

import packageErrors from "../../utils/package-errors";

import getPasswordErrors from "../utils/get-password-errors";
import getConfirmPasswordErrors from "../utils/get-confirm-password-errors";

import getUsernameErrors from "./utils/get-username-errors";
import getEmailErrors from "./utils/get-email-errors";

export default async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const usernamePath = "username";
  const emailPath = "email";
  const passwordPath = "password";
  const confirmPasswordPath = "confirmPassword";
  const errors: Array<{ path: string; message: string }> = [];

  const usernameErrors = await getUsernameErrors(username);
  if (usernameErrors.length > 0) {
    errors.push(...packageErrors(usernamePath, usernameErrors));
  }

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

  if (errors.length > 0) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors);
  }

  next();
};

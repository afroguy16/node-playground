import validator from "validator";
import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/utils/constants";

import packageErrors from "../../../utils/package-errors";

import getPasswordErrors from "../../utils/get-password-errors";
import getConfirmPasswordErrors from "../../utils/get-confirm-password-errors";
import getTokenErrors from "../../utils/get-token-errors";
import { NextFunction, Request, Response } from "express";
import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
} from "../../constants";
import User from "../../../../../models/User";

/**
 * Validator - validate password reset request payload with a set of validation rules to ensure that it is compliant
 *
 * @async
 * @param {Request} req - The Request object from the Router
 * @param {Response} res - The Response object that is used to send error to the client if validation fails
 * @param {NextFunction} next - The next() function that is called so the next route argument (e.g.) controller can be called. This is called when all validations passes
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, confirmPassword, token } = req.body;
    const emailPath = "email";
    const passwordPath = "password";
    const confirmPasswordPath = "confirmPassword";
    const tokenPath = "token";
    const errors: Array<{ path: string; message: string }> = [];

    // validate email type
    if (!email || !validator.isEmail(email)) {
      return res
        .status(ERROR_CODE_UNPROCESSED_ENTITY)
        .json([{ path: emailPath, message: EMAIL_ERROR_MESSAGE_INVALID_TYPE }]);
    }

    const user = await User.get({ email });

    if (!user) {
      return res
        .status(ERROR_CODE_UNPROCESSED_ENTITY)
        .json([
          {
            path: emailPath,
            message: REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
          },
        ]);
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
      return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors); // return errors if there is any error from password and confirmPassword so the database isn't called in the next if branch (getTokenErrors)
    }

    const tokenErrors = await getTokenErrors(token, email);
    if (tokenErrors.length > 0) {
      return res
        .status(ERROR_CODE_UNPROCESSED_ENTITY)
        .json([...packageErrors(tokenPath, tokenErrors)]);
    }
  } catch (e) {
    next(e);
  }

  next();
};

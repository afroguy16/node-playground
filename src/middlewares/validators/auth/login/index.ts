import validator from "validator";
import { NextFunction, Request, Response } from "express";

import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../controllers/utils/constants";
import User from "../../../../models/User";
import { UserAttributes } from "../../../../models/User/interfaces";

import packageErrors from "../../utils/package-errors";

import { LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS } from "../constants";

import isMatchedUserPassword from "./custom-validators/isMatchedUserPassword";

/**
 * Validator - validates login request payload with a set of validation utilities to ensure that it is compliant
 *
 * @async
 * @param {Request} req - The Request object from the Router
 * @param {Response} res - The Response object that is used to send error to the client if validation fails
 * @param {NextFunction} next - The next() function that is called so the next route argument (e.g.) controller can be called. This is called when all validations passes
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const modifiedRequest = req as Request & { userId: string | undefined };
  const { email, password } = modifiedRequest.body;
  const path = "login"; // use generic input path to protect security
  const errors: Array<{ path: string; message: string }> = [];

  // validate email type
  if (!email || !validator.isEmail(email)) {
    errors.push(
      ...packageErrors(path, [LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS])
    );
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors);
  }

  // fetch user
  const user = (await User.get({ email })) as UserAttributes;

  if (!user) {
    errors.push(
      ...packageErrors(path, [LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS])
    );
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors);
  }

  if (
    !password ||
    !user.password ||
    !(await isMatchedUserPassword(password, user.password))
  ) {
    errors.push(
      ...packageErrors(path, [LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS])
    );
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).json(errors);
  }

  modifiedRequest.userId = user._id;
  next();
};

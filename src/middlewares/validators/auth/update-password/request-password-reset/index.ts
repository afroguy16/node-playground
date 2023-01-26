import validator from "validator";
import { NextFunction, Request, Response } from "express";

import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/utils/constants";
import User from "../../../../../models/User";

import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
} from "../../constants";

/**
 * Validator - validate request password reset request payload with a set of validation rules to ensure that it is compliant
 *
 * @async
 * @param {Request} req - The Request object from the Router
 * @param {Response} res - The Response object that is used to send error to the client if validation fails
 * @param {NextFunction} next - The next() function that is called so the next route argument (e.g.) controller can be called. This is called when all validations passes
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const path = "email";

  // validate email type
  if (!email || !validator.isEmail(email)) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json([{ path, message: EMAIL_ERROR_MESSAGE_INVALID_TYPE }]);
  }

  // fetch user
  try {
    const user = await User.get({ email });

    if (!user) {
      return res
        .status(ERROR_CODE_UNPROCESSED_ENTITY)
        .json([
          { path, message: REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND },
        ]);
    }
  } catch (e) {
    next([{ path, message: e }]);
  }

  next();
};

import { NextFunction, Request, Response } from "express";

import validator from "validator";
import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/utils/constants";
import User from "../../../../../models/User";
import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
} from "../../constants";

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

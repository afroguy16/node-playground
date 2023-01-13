import bcyrpt from "bcryptjs";

import { Request } from "express-validator/src/base";
import { LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS } from "../../constants";

export default async (password: string, req: Request) => {
  if (req.session.pendingLoggedInUser?.password) {
    const matched = await bcyrpt.compare(
      password,
      req.session.pendingLoggedInUser.password
    );
    if (matched) {
      return true;
    }
  }

  throw new Error(LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS);
};

import { NextFunction, Request, Response } from "express-serve-static-core";
import { ERROR_CODE_UNAUTHORIZED } from "../../../../controllers/utils/constants";
import { IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED } from "../constants";
import getAuthenticatedUserId from "./utils/get-authenticated-user-id";

/**
 * Authenticate Validator - check if the request has a valid authentication token attached to its header
 *
 * @async
 * @param {Request} req - The Request object from the Router
 * @param {Response} res - The Response object that is used to send error to the client if validation fails
 * @param {NextFunction} next - The next() function that is called so the next route argument (e.g.) controller can be called. This is called when all validations passes
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const modifiedRequest = req as Request & { userId: string | undefined };
  const userId = getAuthenticatedUserId(req);

  if (userId) {
    modifiedRequest.userId = userId;
    next();
  } else {
    res
      .status(ERROR_CODE_UNAUTHORIZED)
      .json({ message: IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED });
  }
};

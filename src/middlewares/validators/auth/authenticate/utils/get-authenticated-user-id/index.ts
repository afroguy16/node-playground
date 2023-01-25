import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { TO_MOVE_VARIABLE_HASH_KEY } from "../../../constants";

/**
 * Get the compliance errors of a given password against a set of defined validation rules
 *
 * @param {Request} req - The Request object from the Router
 * @returns {string}
 */
export default (req: Request): string => {
  try {
    const token = req.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(
      token,
      TO_MOVE_VARIABLE_HASH_KEY
    ) as JwtPayload;
    return decodedToken.userId;
  } catch {
    return "";
  }
};

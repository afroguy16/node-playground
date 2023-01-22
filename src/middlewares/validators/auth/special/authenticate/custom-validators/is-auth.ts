import jwt from "jsonwebtoken";

import {
  IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST,
  TO_MOVE_VARIABLE_HASH_KEY,
} from "../../../constants";

export default (req) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1];
    const decodedToken = jwt.verify(token, TO_MOVE_VARIABLE_HASH_KEY);
    req.jwt = { userId: decodedToken.userId };
    return true;
  } catch (e) {
    return false;
  }
};

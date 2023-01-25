import jwt from "jsonwebtoken";

import { TO_MOVE_VARIABLE_HASH_KEY } from "../../../constants";

export default (req) => {
  try {
    const token = req.get("Authorization")?.split(" ")[1];
    const decodedToken = jwt.verify(token, TO_MOVE_VARIABLE_HASH_KEY);
    return decodedToken.userId;
  } catch {
    return "";
  }
};

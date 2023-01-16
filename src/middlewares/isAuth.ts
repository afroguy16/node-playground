import jwt from "jsonwebtoken";
import { ERROR_CODE_UNAUTHORIZED } from "../controllers/constants";

export default (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, "this is some long ass ");
    req.jwt = { userId: decodedToken.userId };
    next();
  } catch (e) {
    res
      .status(ERROR_CODE_UNAUTHORIZED)
      .json({ message: "Not authorized", error: e });
  }
};

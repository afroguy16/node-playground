import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import isAuth from "../custom-validators/isAuth";

export default (req, res, next) => {
  try {
    isAuth(req);
    next();
  } catch (e) {
    res
      .status(ERROR_CODE_UNAUTHORIZED)
      .json({ message: "Not authorized", error: e });
  }
};

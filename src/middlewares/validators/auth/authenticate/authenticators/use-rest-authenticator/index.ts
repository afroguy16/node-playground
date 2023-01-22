import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import { IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED } from "../../../constants";
import getAuthenticatedUserId from "../../utils/get-authenticated-user-id";

export default (req, res, next) => {
  const payload = getAuthenticatedUserId(req);

  if (payload?.userId) {
    req.userId = payload.userId;
    next();
  } else {
    res
      .status(ERROR_CODE_UNAUTHORIZED)
      .json({ message: IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED });
  }
};

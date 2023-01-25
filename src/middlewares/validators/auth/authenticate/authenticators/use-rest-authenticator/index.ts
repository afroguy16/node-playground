import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/utils/constants";
import { IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED } from "../../../constants";
import getAuthenticatedUserId from "../../utils/get-authenticated-user-id";

export default (req, res, next) => {
  const userId = getAuthenticatedUserId(req);

  if (userId) {
    req.userId = userId;
    next();
  } else {
    res
      .status(ERROR_CODE_UNAUTHORIZED)
      .json({ message: IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED });
  }
};

import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import { createGraphQLErrorObject } from "../../../../../../graphql/utils";
import { IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED } from "../../../constants";
import getAuthenticatedUserId from "../../utils/get-authenticated-user-id";

export default (path: string, req) => {
  const payload = getAuthenticatedUserId(req);

  if (payload?.userId) {
    req.userId = payload.userId;
  } else {
    throw createGraphQLErrorObject(
      IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED,
      [{ path, message: IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED }],
      ERROR_CODE_UNAUTHORIZED
    );
  }
};

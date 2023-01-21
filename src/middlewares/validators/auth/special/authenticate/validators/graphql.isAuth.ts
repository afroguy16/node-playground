import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import { createGraphQLErrorObject } from "../../../../../../graphql/utils";
import isAuth from "../custom-validators/is-auth";

export default (path: string, req) => {
  try {
    return isAuth(req);
  } catch (e) {
    throw createGraphQLErrorObject(
      (e as any).message,
      [{ path, message: e }],
      ERROR_CODE_UNAUTHORIZED
    );
  }
};

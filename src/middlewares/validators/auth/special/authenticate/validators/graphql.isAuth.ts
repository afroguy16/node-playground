import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import { createGraphQLErrorObject } from "../../../../../../graphql/utils";
import isAuth from "../custom-validators/isAuth";

export default (req) => {
  try {
    return isAuth(req);
  } catch (e) {
    throw createGraphQLErrorObject(
      (e as any).message,
      [{ path: "addProduct", message: e }],
      ERROR_CODE_UNAUTHORIZED
    );
  }
};

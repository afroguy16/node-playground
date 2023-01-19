import validator from "validator";

import {
  UPDATE_PRODUCT_TITLE_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  UPDATE_PRODUCT_TITLE_LENGTH,
} from "../../constants";

export default (source, req) => {
  const title = source.title;
  const path = "title";

  if (!title) {
    req.validator.setError(
      path,
      UPDATE_PRODUCT_TITLE_ERROR_MESSAGE_LENGTH_TOO_SHORT
    );
    return false;
  }

  if (!validator.isLength(title, { min: UPDATE_PRODUCT_TITLE_LENGTH })) {
    req.validator.setError(
      path,
      UPDATE_PRODUCT_TITLE_ERROR_MESSAGE_LENGTH_TOO_SHORT
    );
    return false;
  }

  return true;
};

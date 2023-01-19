import validator from "validator";
import {
  UPDATE_PRODUCT_DESCRIPTION_LENGTH,
  UPDATE_PRODUCT_DESCRIPTION_ERROR_MESSAGE_LENGTH_TOO_SHORT,
} from "../../constants";

export default (source, req) => {
  const { description } = source;
  const path = "description";

  if (!description) {
    req.validator.setError(
      path,
      UPDATE_PRODUCT_DESCRIPTION_ERROR_MESSAGE_LENGTH_TOO_SHORT
    );
    return false;
  }

  if (
    !validator.isLength(description, { min: UPDATE_PRODUCT_DESCRIPTION_LENGTH })
  ) {
    req.validator.setError(
      path,
      UPDATE_PRODUCT_DESCRIPTION_ERROR_MESSAGE_LENGTH_TOO_SHORT
    );
    return false;
  }

  return true;
};

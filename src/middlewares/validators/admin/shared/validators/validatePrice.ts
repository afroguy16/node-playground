import validator from "validator";

import { UPDATE_PRODUCT_PRICE_ERROR_MESSAGE_INVALID_TYPE } from "../../constants";

export default (source, req) => {
  const { price } = source;
  const path = "price";

  if (!price) {
    req.validator.setError(
      path,
      UPDATE_PRODUCT_PRICE_ERROR_MESSAGE_INVALID_TYPE
    );
    return false;
  }

  if (!validator.isFloat(price.toString())) {
    req.validator.setError(
      path,
      UPDATE_PRODUCT_PRICE_ERROR_MESSAGE_INVALID_TYPE
    );
    return false;
  }

  return true;
};

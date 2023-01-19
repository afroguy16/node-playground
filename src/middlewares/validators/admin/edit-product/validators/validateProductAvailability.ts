import {
  UPDATE_PRODUCT_ID_EMPTY,
  UPDATE_PRODUCT_UNAVAILABLE_PRODUCT,
} from "../../constants";
import isValidProductId from "../../shared/custom-validators/isValidProductId";

export default async (source, req) => {
  const { id: productId } = source;
  const path = "id";

  if (!productId) {
    req.validator.setError(path, UPDATE_PRODUCT_ID_EMPTY);
    return false;
  }

  if (!(await isValidProductId(productId, req))) {
    req.validator.setError(path, UPDATE_PRODUCT_UNAVAILABLE_PRODUCT);
    return false;
  }

  return true;
};

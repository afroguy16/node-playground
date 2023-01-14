import { body } from "express-validator";

import { UPDATE_PRODUCT_PRICE_ERROR_MESSAGE_INVALID_TYPE } from "../../constants";

export default () =>
  body("price", UPDATE_PRODUCT_PRICE_ERROR_MESSAGE_INVALID_TYPE).isFloat();

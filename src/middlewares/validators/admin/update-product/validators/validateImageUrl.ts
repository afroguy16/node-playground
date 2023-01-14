import { body } from "express-validator";

import { UPDATE_PRODUCT_IMAGE_URL_ERROR_MESSAGE_INVALID_TYPE } from "../../constants";

export default () =>
  body("imageUrl", UPDATE_PRODUCT_IMAGE_URL_ERROR_MESSAGE_INVALID_TYPE).isURL();

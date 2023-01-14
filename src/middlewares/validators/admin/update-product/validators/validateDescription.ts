import { body } from "express-validator";
import {
  UPDATE_PRODUCT_DESCRIPTION_LENGTH,
  UPDATE_PRODUCT_DESCRIPTION_ERROR_MESSAGE_LENGTH_TOO_SHORT,
} from "../../constants";

export default () =>
  body(
    "description",
    UPDATE_PRODUCT_DESCRIPTION_ERROR_MESSAGE_LENGTH_TOO_SHORT
  ).isLength({ min: UPDATE_PRODUCT_DESCRIPTION_LENGTH });

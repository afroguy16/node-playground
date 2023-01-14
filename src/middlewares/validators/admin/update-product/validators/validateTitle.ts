import { body } from "express-validator";
import {
  UPDATE_PRODUCT_TITLE_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  UPDATE_PRODUCT_TITLE_LENGTH,
} from "../../constants";

export default () =>
  body("title", UPDATE_PRODUCT_TITLE_ERROR_MESSAGE_LENGTH_TOO_SHORT).isLength({
    min: UPDATE_PRODUCT_TITLE_LENGTH,
  });

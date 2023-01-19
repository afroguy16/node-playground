import { param } from "express-validator";
import isUserAuthorisedToUpdate from "../../edit-product/custom-validators/isUserAuthorisedToUpdate";

export default () =>
  param("id").custom(
    (productId, { req }) => isUserAuthorisedToUpdate(productId, req.body.id) // TODO - fix broken request
  );

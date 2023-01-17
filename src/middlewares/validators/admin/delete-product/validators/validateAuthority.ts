import { param } from "express-validator";
import isUserAuthorisedToUpdate from "../../shared/custom-validators/isUserAuthorisedToUpdate";

export default () =>
  param("id").custom((productId, { req }) =>
    isUserAuthorisedToUpdate(productId, req)
  );

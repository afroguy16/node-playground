import { body } from "express-validator";
import isUserAuthorisedToUpdate from "../../shared/custom-validators/isUserAuthorisedToUpdate";

export default () =>
  body("id").custom((productId, { req }) =>
    isUserAuthorisedToUpdate(productId, req)
  );

import { body } from "express-validator";
import isUserAuthorisedToUpdate from "../custom-validators/isUserAuthorisedToUpdate";

export default () =>
  body("id").custom((id, { req }) => isUserAuthorisedToUpdate(id, req));

import { body } from "express-validator";
import isTokenAvailable from "../custom-validators/isTokenAvailable";
import isTokenTimeValid from "../custom-validators/isTokenTimeValid";

export default () => {
  return body("token", "BAD TOKEN")
    .isAlphanumeric()
    .custom((token, { req }) => isTokenAvailable(token, req))
    .custom((token, { req }) => isTokenTimeValid(req));
};

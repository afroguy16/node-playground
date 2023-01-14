import { param } from "express-validator";

import isTokenAvailable from "../../../shared/custom-validators/isTokenAvailable";
import isTokenTimeValid from "../../../shared/custom-validators/isTokenTimeValid";

export default () => {
  return param("token", "BAD TOKEN")
    .isAlphanumeric()
    .custom((token, { req }) => isTokenAvailable(token, req))
    .custom((token, { req }) => isTokenTimeValid(req));
};

import {
  ERROR_EMPTY_ERRORS,
  ERROR_EMPTY_PATH,
  ERROR_EMPTY_PATH_AND_ERRORS,
} from "./constants";
import { PackagedError } from "./interfaces";

/**
 * Takes a path and an array of paths, then return a packaged error array
 *
 * @param {string} path - The location of the error
 * @param {Array<string>} errors - The errors to package.
 * @returns {Array<PackagedError>}
 */
export default (path: string, errors: Array<string>): Array<PackagedError> => {
  if (!path && errors.length < 1) {
    throw new Error(ERROR_EMPTY_PATH_AND_ERRORS);
  }

  if (!path) {
    throw new Error(ERROR_EMPTY_PATH);
  }

  if (errors.length < 1) {
    throw new Error(ERROR_EMPTY_ERRORS);
  }

  const packagedErrors: Array<{ path: string; message: string }> = [];
  errors.forEach((error) => packagedErrors.push({ path, message: error }));
  return packagedErrors;
};

import validator from "validator";

import {
  PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  PASSWORD_LENGTH,
} from "../constants";

export default (password: string) => {
  if (!password || !validator.isLength(password, { min: PASSWORD_LENGTH })) {
    return [PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT];
  }
  return [];
};

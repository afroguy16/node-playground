import getPasswordErrors from ".";
import {
  PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  PASSWORD_LENGTH,
} from "../../constants";

describe("Auth Utility - Get Password Errors", () => {
  it(`should return array with a messsage of ${PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT} if there is no password is given`, () => {
    getPasswordErrors("");
  });

  it(`should return array with a messsage of ${PASSWORD_ERROR_MESSAGE_LENGTH_TOO_SHORT} if the length of the password given is less than ${PASSWORD_LENGTH}`, () => {
    getPasswordErrors("12");
  });

  it(`should return an empty array if the password length given is greater than ${PASSWORD_LENGTH}`, () => {
    getPasswordErrors("123");
  });
});

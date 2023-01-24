import getConfirmPasswordErrors from ".";

import {
  CONFIRM_PASSWORD_ERROR_MISMATCHED,
  CONFIRM_PASSWORD_ERROR_SHORT_LENGTH,
} from "../../constants";

describe("Auth Utility - Get Conform Password Errors", () => {
  it(`should return array with a messsage of ${CONFIRM_PASSWORD_ERROR_SHORT_LENGTH} if there is no confirm password is given`, () => {
    expect(getConfirmPasswordErrors("", "")).toStrictEqual([
      CONFIRM_PASSWORD_ERROR_SHORT_LENGTH,
    ]);
  });

  it(`should return array with a messsage of ${CONFIRM_PASSWORD_ERROR_MISMATCHED} if there is no password is given`, () => {
    expect(getConfirmPasswordErrors("1", "")).toStrictEqual([
      CONFIRM_PASSWORD_ERROR_MISMATCHED,
    ]);
  });

  it(`should return array with a messsage of ${CONFIRM_PASSWORD_ERROR_MISMATCHED} if the "confirmPassword" and the "password" doesn't match`, () => {
    expect(getConfirmPasswordErrors("1", "12")).toStrictEqual([
      CONFIRM_PASSWORD_ERROR_MISMATCHED,
    ]);
  });

  it(`should return an empty array if the "confirmPassword" and the "password" matches`, () => {
    expect(getConfirmPasswordErrors("12", "12")).toStrictEqual([]);
  });
});

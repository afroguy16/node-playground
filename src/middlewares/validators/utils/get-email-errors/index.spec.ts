import getEmailErrors from ".";
import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
  EMAIL_UNACCEPTABLE_ADDRESSES,
} from "../../auth/constants";

describe("Validator Utility - Get Email Errors", () => {
  it(`should return array with a messsage of ${EMAIL_ERROR_MESSAGE_INVALID_TYPE} if no email is given`, () => {
    expect(getEmailErrors("")).toStrictEqual([
      EMAIL_ERROR_MESSAGE_INVALID_TYPE,
    ]);
  });

  it(`should return array with a messsage of ${EMAIL_ERROR_MESSAGE_INVALID_TYPE} if the email given isn't a valid email`, () => {
    expect(getEmailErrors("sw")).toStrictEqual([
      EMAIL_ERROR_MESSAGE_INVALID_TYPE,
    ]);
  });

  it(`should return array with a messsage of ${EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS} if the email given is one of the ${EMAIL_UNACCEPTABLE_ADDRESSES}`, () => {
    expect(getEmailErrors("test@test.com")).toStrictEqual([
      EMAIL_ERROR_MESSAGE_UNACCEPTABLE_ADDRESS,
    ]);
  });

  it(`should return an empty array if the email given isn't one of the ${EMAIL_UNACCEPTABLE_ADDRESSES}`, () => {
    expect(getEmailErrors("fake-email@random.com")).toStrictEqual([]);
  });
});

import User from "../../../../../../models/User";

import {
  USERNAME_ERROR_INVALID_TYPE,
  USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
  USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS,
  USERNAME_LENGTH,
} from "../../../constants";

import getUsernameErrors from ".";

jest.mock("../../../../../../models/User");

describe("Signup Utility - Get Username Errors", () => {
  it(`should return an array with a message of ${USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT} if there is no username`, async () => {
    expect(await getUsernameErrors("")).toStrictEqual([
      USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
    ]);
  });

  it(`should return an array with a message of ${USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT} if the length of the username provided is less than ${USERNAME_LENGTH}`, async () => {
    expect(await getUsernameErrors("12")).toStrictEqual([
      USERNAME_ERROR_MESSAGE_LENGTH_TOO_SHORT,
    ]);
  });

  it(`should return an array with a message of ${USERNAME_ERROR_INVALID_TYPE} if the character of the username provided is'nt alphanumeric`, async () => {
    expect(await getUsernameErrors("/22")).toStrictEqual([
      USERNAME_ERROR_INVALID_TYPE,
    ]);
  });

  it(`should return an array with a message of ${USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS} if the username is already taken`, async () => {
    const mockedGetUser = jest.mocked(User.get);
    mockedGetUser.mockResolvedValue({
      _id: "fakeId",
      username: "fakeUsername",
      email: "fake@email.com",
    });

    expect(await getUsernameErrors("fakeUsername")).toStrictEqual([
      USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS,
    ]);

    mockedGetUser.mockReset();
  });

  it(`should return an empty array when the username length is up to ${USERNAME_LENGTH}, has alphanumeric characters and the username isn't taken`, async () => {
    const mockedGetUser = jest.mocked(User.get);
    mockedGetUser.mockResolvedValue(null);

    expect(await getUsernameErrors("fakeUsername")).toStrictEqual([]);

    mockedGetUser.mockReset();
  });
});

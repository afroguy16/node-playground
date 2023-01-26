import User from "../../../../../../models/User";
import authGetEmailErrors from "../../../../utils/get-email-errors";

import { EMAIL_UNAVAILABLE_ADDRESS } from "../../../constants";

import getEmailErrors from ".";

jest.mock("../../../../utils/get-email-errors");
jest.mock("../../../../../../models/User");

describe("Signup Utility - Get Email Errors", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an array with messages from the Auth getEmailErrors function if present", async () => {
    const fakeErrorMessage = "fake error message";
    const mockedAuthGetEmailErrors = jest.mocked(authGetEmailErrors);
    mockedAuthGetEmailErrors.mockReturnValue([fakeErrorMessage]);

    expect(await getEmailErrors("fake@email.com")).toStrictEqual([
      fakeErrorMessage,
    ]);
  });

  it(`should return an array with a message of ${EMAIL_UNAVAILABLE_ADDRESS} if the user is taken and no error is returned from the Auth getEmailErrors function`, async () => {
    const mockedUserGet = jest.mocked(User.get);
    const mockedAuthGetEmailErrors = jest.mocked(authGetEmailErrors);
    mockedAuthGetEmailErrors.mockReturnValue([]);

    mockedUserGet.mockResolvedValue({
      _id: "fakeId",
      username: "fakeUsername",
      email: "fake@email.com",
    });

    expect(await getEmailErrors("fake@email.com")).toStrictEqual([
      EMAIL_UNAVAILABLE_ADDRESS,
    ]);
  });

  it(`should return an empty array if the user isn't taken and no error is returned from the Auth getEmailErrors function`, async () => {
    const mockedUserGet = jest.mocked(User.get);
    const mockedAuthGetEmailErrors = jest.mocked(authGetEmailErrors);
    mockedAuthGetEmailErrors.mockReturnValue([]);

    mockedUserGet.mockResolvedValue(null);

    expect(await getEmailErrors("fake@email.com")).toStrictEqual([]);
  });
});

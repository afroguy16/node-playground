import { verify } from "jsonwebtoken";

import isAuth from ".";

jest.mock("jsonwebtoken");

describe("Get Authenticated UserId Utility", () => {
  it("should return null if no Authorization header is present", () => {
    const req = {
      get: () => null,
    };

    expect(isAuth(req)).toBe(null);
  });

  it("should return null if no Authorization header contains only one word", () => {
    const req = {
      get: () => "anythingOneValue",
    };

    expect(isAuth(req)).toBe(null);
  });

  it("should return null if the token cannot be verified", () => {
    const req = {
      get: () => "Bearer anyfaketoken",
    };

    expect(isAuth(req)).toBe(null);
  });

  it("should return a payload of containing the userID if token is decoded", () => {
    const req = {
      get: () => "Bearer anyValue",
    };

    const expected = { userId: "randomId" };

    const mock = jest.mocked(verify).mockImplementation(() => expected);

    expect(isAuth(req)).toStrictEqual(expected);

    mock.mockRestore();
  });
});

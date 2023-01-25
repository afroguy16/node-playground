import { verify } from "jsonwebtoken";

import isAuth from ".";

jest.mock("jsonwebtoken");

describe("Get Authenticated UserId Utility", () => {
  it("should return an empty string if no Authorization header is present", () => {
    const req: any = {
      get: () => null,
    };

    expect(isAuth(req)).toBe("");
  });

  it("should return an empty string if Authorization header contains only one word", () => {
    const req: any = {
      get: () => "anythingOneValue",
    };

    expect(isAuth(req)).toBe("");
  });

  it("should return an empty string if the token cannot be verified", () => {
    const req: any = {
      get: () => "Bearer anyfaketoken",
    };

    expect(isAuth(req)).toBe("");
  });

  it("should return a userID if token is decoded", () => {
    const req: any = {
      get: () => "Bearer anyValue",
    };

    const mock = jest
      .mocked(verify)
      .mockImplementation(() => ({ userId: "randomId" }));

    expect(isAuth(req)).toStrictEqual("randomId");

    mock.mockRestore();
  });
});

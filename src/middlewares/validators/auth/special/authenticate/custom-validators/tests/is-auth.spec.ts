import { verify } from "jsonwebtoken";

import isAuth from "../is-auth";

jest.mock("jsonwebtoken");

describe("Is-Auth Middleware", () => {
  it("should return false if no Authorization header is present", () => {
    const req = {
      get: () => null,
    };

    expect(isAuth(req)).toBe(false);
  });

  it("should return false if no Authorization header contains only one word", () => {
    const req = {
      get: () => "anythingOneValue",
    };

    expect(isAuth(req)).toBe(false);
  });

  it("should return false if the token cannot be verified", () => {
    const req = {
      get: () => "Bearer anyfaketoken",
    };

    expect(isAuth(req)).toBe(false);
  });

  it("should add userId to the request (req) body once token is decoded and should return true", () => {
    const req = {
      get: () => "Bearer anythingOneValue",
    };

    const mock = jest.mocked(verify).mockImplementation(() => {
      return {
        userId: "randomId",
      };
    });

    expect(isAuth(req)).toBe(true);

    expect(req).toHaveProperty("jwt");
    expect((req as any).jwt).toHaveProperty("userId", "randomId");

    mock.mockRestore();
  });
});

import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";

import { IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST } from "../../../../constants";
import isAuth from "../is-auth";

describe("Is-Auth Middleware", () => {
  it("should throw the illegal authentication request error message if no Authorization header is present", () => {
    const req = {
      get: () => null,
    };

    expect(isAuth.bind(this, req)).to.throw(
      IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST
    );
  });

  it("should throw the illegal authentication request error message if the authorization header contains only one word", () => {
    const req = {
      get: () => "anythingOneValue",
    };

    expect(isAuth.bind(this, req)).to.throw(
      IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST
    );
  });

  it("should throw the illegal authentication request error message if the token cannot be verified", () => {
    const req = {
      get: () => "Bearer anythingOneValue",
    };

    expect(isAuth.bind(this, req)).to.throw(
      IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST
    );
  });

  it("should add userId to the request (req) body once token is decoded", () => {
    const req = {
      get: () => "Bearer anythingOneValue",
    };

    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "randomId",
    });

    isAuth(req);

    expect(req).to.have.property("jwt").to.have.property("userId", "randomId");

    jwt.verify.restore();
  });
});

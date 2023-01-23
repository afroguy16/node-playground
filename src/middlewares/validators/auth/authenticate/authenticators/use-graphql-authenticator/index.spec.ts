import { GraphQLError } from "graphql";

import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import * as graphqlUtils from "../../../../../../graphql/utils";

import { IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED } from "../../../constants";
import getAuthenticatedUserId from "../../utils/get-authenticated-user-id";

import useRestAuthenticator from ".";

jest.mock("../../utils/get-authenticated-user-id");

describe("Use Graphql Authenticator Middleware", () => {
  const path = "useGraphQlAuthenticatorMiddlewareTest";

  it("should send an error response if no valid user is found", () => {
    const mockedGetAuthenticatedUserId = jest
      .mocked(getAuthenticatedUserId)
      .mockReturnValue(null);
    const mockedCreateGraphQLErrorObject = jest.spyOn(
      graphqlUtils,
      "createGraphQLErrorObject"
    );

    const req = {};

    expect(() => useRestAuthenticator(path, req)).toThrow(GraphQLError);
    expect(mockedCreateGraphQLErrorObject).toHaveBeenCalledWith(
      IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED,
      [{ message: IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED, path }],
      ERROR_CODE_UNAUTHORIZED
    );

    mockedGetAuthenticatedUserId.mockRestore();
  });

  it("should save the user id in the req.userId key and call the next function if use is found", () => {
    const fakeUserId = "anyRandomStringWillWorkAsFakeId";
    jest.mocked(getAuthenticatedUserId).mockReturnValue({ userId: fakeUserId });

    const req = {};

    useRestAuthenticator(path, req);
    expect((req as any).userId).toBe(fakeUserId);
  });
});

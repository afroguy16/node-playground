import useRestAuthenticator from ".";
import { ERROR_CODE_UNAUTHORIZED } from "../../../../../../controllers/constants";
import { IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST } from "../../../constants";
import getAuthenticatedUserId from "../../utils/get-authenticated-user-id";

jest.mock("../../utils/get-authenticated-user-id");

describe("Use Rest Authenticator Middleware", () => {
  it("should send an error response if no valid user is found", () => {
    jest.mocked(getAuthenticatedUserId).mockReturnValue(null);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = () => {};

    useRestAuthenticator(req, res, next);
    expect(res.status).toHaveBeenNthCalledWith(1, ERROR_CODE_UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      message: IS_AUTH_ERROR_MESSAGE_ILLEGAL_AUTHENTICATION_REQUEST,
    });
  });

  it("should save the user id in the res locals userId key and call the next function if use is found", () => {
    const fakeUserId = "anyRandomStringWillWorkAsFakeId";
    jest.mocked(getAuthenticatedUserId).mockReturnValue({ userId: fakeUserId });

    const req = {};
    const res = {};
    const mockedNext = jest.fn();

    useRestAuthenticator(req, res, mockedNext);
    expect((req as any).userId).toBe(fakeUserId);
    expect(mockedNext).toHaveBeenNthCalledWith(1);
  });
});

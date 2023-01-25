import authenticate from ".";
import { ERROR_CODE_UNAUTHORIZED } from "../../../../controllers/utils/constants";
import { IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED } from "../constants";
import getAuthenticatedUserId from "./utils/get-authenticated-user-id";

jest.mock("./utils/get-authenticated-user-id");

describe("Use Rest Authenticator Middleware", () => {
  it("should send an error response if no valid user is found", () => {
    jest.mocked(getAuthenticatedUserId).mockReturnValue("");

    const req: any = {};
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = () => {};

    authenticate(req, res, next);
    expect(res.status).toHaveBeenNthCalledWith(1, ERROR_CODE_UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({
      message: IS_AUTH_ERROR_MESSAGE_UNAUTHORIZED,
    });
  });

  it("should save the user id in the res locals userId key and call the next function if use is found", () => {
    const fakeUserId = "anyRandomStringWillWorkAsFakeId";
    jest.mocked(getAuthenticatedUserId).mockReturnValue(fakeUserId);

    const req: any = {};
    const res: any = {};
    const mockedNext = jest.fn();

    authenticate(req, res, mockedNext);
    expect((req as any).userId).toBe(fakeUserId);
    expect(mockedNext).toHaveBeenNthCalledWith(1);
  });
});

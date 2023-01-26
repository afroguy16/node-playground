import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../../controllers/utils/constants";
import User from "../../../../../models/User";

import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
} from "../../constants";

import requestPasswordReset from ".";

jest.mock("../../../../../models/User");

describe("Auth Validator - Request password reset", () => {
  const req: any = {
    body: {
      email: "",
    },
  };

  const res: any = {};

  const next = jest.fn();
  const expectedError = [
    { path: "email", message: EMAIL_ERROR_MESSAGE_INVALID_TYPE },
  ];

  afterEach(jest.resetAllMocks);
  beforeEach(() => {
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
  });

  it(`should return an error if email there is no email`, async () => {
    await requestPasswordReset(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it(`should return an error if email isn't valid`, async () => {
    req.body.email = "abc";
    await requestPasswordReset(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expectedError);
  });

  it(`should return an error if there is a valid email but no user was found`, async () => {
    req.body.email = "abc@fake.email.com";
    jest.mocked(User.get).mockResolvedValue(null);
    await requestPasswordReset(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      {
        path: "email",
        message: REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
      },
    ]);
  });

  it(`should return an error if there is a valid email but no an error was thrown from the user`, async () => {
    const fakeError = "error message";
    req.body.email = "abc@fake.email.com";
    jest.mocked(User.get).mockRejectedValue("error message");
    await requestPasswordReset(req, res, next);

    expect(next).toHaveBeenCalledWith([{ path: "email", message: fakeError }]);
  });

  it(`should return a success message when a valid email is provided and a user was found`, async () => {
    req.body.email = "abc@fake.email.com";
    jest
      .mocked(User.get)
      .mockResolvedValue({
        _id: "fakeId",
        email: "fake@email.com",
        username: "fakeuserName",
      });
    await requestPasswordReset(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

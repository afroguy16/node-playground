import {
  ERROR_CODE_UNPROCESSED_ENTITY,
  SUCCESS_CODE_CREATED,
  SUCCES_MESSAGE_GENERIC,
} from "../../../../../controllers/utils/constants";
import User from "../../../../../models/User";

import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
} from "../../constants";
import getPasswordErrors from "../../utils/get-password-errors";
import getConfirmPasswordErrors from "../../utils/get-confirm-password-errors";
import getTokenErrors from "../../utils/get-token-errors";

import resetPasswordValidator from ".";

jest.mock("../../../../../models/User");
jest.mock("../../utils/get-password-errors");
jest.mock("../../utils/get-confirm-password-errors");
jest.mock("../../utils/get-token-errors");

describe("Auth Validator - Reset password", () => {
  const req: any = {
    body: {},
  };
  const res: any = {};
  let next;

  beforeEach(() => {
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    next = jest.fn();
  });

  afterEach(jest.resetAllMocks);

  it("should return an error response if there is no email address in the request body", async () => {
    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      { path: "email", message: EMAIL_ERROR_MESSAGE_INVALID_TYPE },
    ]);
  });

  it("should return an error response if the email address in the request body isn't valid", async () => {
    req.body.email = "abc";

    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      { path: "email", message: EMAIL_ERROR_MESSAGE_INVALID_TYPE },
    ]);
  });

  it("should call the next function and pass an error with it if an exception is thrown e.g. from User.get", async () => {
    const error = new Error("error message");
    req.body.email = "abc@cd.com";
    jest.mocked(User.get).mockRejectedValue(error);

    await resetPasswordValidator(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("should return an error response if no user with the email is returned", async () => {
    req.body.email = "abc@cd.com";
    jest.mocked(User.get).mockResolvedValue(null);

    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      {
        path: "email",
        message: REQUEST_PASSWORD_RESET_ERROR_MESSAGE_NO_USER_FOUND,
      },
    ]);
  });

  it("should return an error response if there is at least one error from password validation", async () => {
    req.body.email = "abc@cd.com";
    const fakePasswordError = "fake password error";

    jest
      .mocked(User.get)
      .mockResolvedValue({ _id: "", email: "", username: "" });
    jest.mocked(getPasswordErrors).mockReturnValue([fakePasswordError]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([]);

    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      { path: "password", message: fakePasswordError },
    ]);
  });

  it("should return an error response if there is at least one error from confirm password validation", async () => {
    req.body.email = "abc@cd.com";
    const fakePasswordError = "fake password error";

    jest
      .mocked(User.get)
      .mockResolvedValue({ _id: "", email: "", username: "" });
    jest.mocked(getPasswordErrors).mockReturnValue([]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([fakePasswordError]);

    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      { path: "confirmPassword", message: fakePasswordError },
    ]);
  });

  it("should return an error response if there is at least one error from both password and confirm password validation", async () => {
    req.body.email = "abc@cd.com";
    const fakePasswordError = "fake password error";

    jest
      .mocked(User.get)
      .mockResolvedValue({ _id: "", email: "", username: "" });
    jest.mocked(getPasswordErrors).mockReturnValue([fakePasswordError]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([fakePasswordError]);

    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      { path: "password", message: fakePasswordError },
      { path: "confirmPassword", message: fakePasswordError },
    ]);
  });

  it("should return an error response if an error is return from getTokens", async () => {
    req.body.email = "abc@cd.com";
    const fakeError = "fake error";

    jest
      .mocked(User.get)
      .mockResolvedValue({ _id: "", email: "", username: "" });
    jest.mocked(getPasswordErrors).mockReturnValue([]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([]);
    jest.mocked(getTokenErrors).mockResolvedValue([fakeError]);

    await resetPasswordValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith([
      { path: "token", message: fakeError },
    ]);
  });

  it("should call next with no argument if there is no error", async () => {
    req.body.email = "abc@cd.com";

    jest
      .mocked(User.get)
      .mockResolvedValue({ _id: "", email: "", username: "" });
    jest.mocked(getPasswordErrors).mockReturnValue([]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([]);
    jest.mocked(getTokenErrors).mockResolvedValue([]);

    await resetPasswordValidator(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

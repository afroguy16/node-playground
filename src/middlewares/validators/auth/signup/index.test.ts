import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../controllers/utils/constants";

import getPasswordErrors from "../utils/get-password-errors";
import getConfirmPasswordErrors from "../utils/get-confirm-password-errors";

import getUsernameErrors from "./utils/get-username-errors";
import getEmailErrors from "./utils/get-email-errors";
import signupValidators from ".";

jest.mock("../utils/get-password-errors");
jest.mock("../utils/get-confirm-password-errors");
jest.mock("./utils/get-username-errors");
jest.mock("./utils/get-email-errors");

describe("Auth Validator - Sign up", () => {
  const req = {
    body: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };
  const fakeError = "any fake error";
  const fakeError2 = "any fake error 2";
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
  });

  it(`should return an error response with a status code of ${ERROR_CODE_UNPROCESSED_ENTITY} and payload of the errors if at least one of the validators return an error`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([fakeError]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([]);
    jest.mocked(getUsernameErrors).mockResolvedValue([]);
    jest.mocked(getEmailErrors).mockResolvedValue([]);

    await signupValidators(req, res, next);

    const expected = [{ path: "password", message: fakeError }];

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it(`should return an error response with a status code of ${ERROR_CODE_UNPROCESSED_ENTITY} and payload of the errors if at least one of the validators return multiple errors`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([fakeError, fakeError2]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([]);
    jest.mocked(getUsernameErrors).mockResolvedValue([]);
    jest.mocked(getEmailErrors).mockResolvedValue([]);

    await signupValidators(req, res, next);

    const expected = [
      { path: "password", message: fakeError },
      { path: "password", message: fakeError2 },
    ];

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it(`should return an error response with a status code of ${ERROR_CODE_UNPROCESSED_ENTITY} and payload of the errors if more than one of the validators return an error`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([fakeError]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([fakeError2]);
    jest.mocked(getUsernameErrors).mockResolvedValue([]);
    jest.mocked(getEmailErrors).mockResolvedValue([]);

    await signupValidators(req, res, next);

    const expected = [
      { path: "password", message: fakeError },
      { path: "confirmPassword", message: fakeError2 },
    ];

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it(`should return an error response with a status code of ${ERROR_CODE_UNPROCESSED_ENTITY} and payload of the errors if more than one of the validators return multiple errors`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([fakeError, fakeError2]);
    jest
      .mocked(getConfirmPasswordErrors)
      .mockReturnValue([fakeError, fakeError2]);
    jest.mocked(getUsernameErrors).mockResolvedValue([]);
    jest.mocked(getEmailErrors).mockResolvedValue([]);

    await signupValidators(req, res, next);

    const expected = [
      { path: "password", message: fakeError },
      { path: "password", message: fakeError2 },
      { path: "confirmPassword", message: fakeError },
      { path: "confirmPassword", message: fakeError2 },
    ];

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it(`should return an error response with a status code of ${ERROR_CODE_UNPROCESSED_ENTITY} and payload of the errors if all the validators return an error`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([fakeError]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([fakeError2]);
    jest.mocked(getUsernameErrors).mockResolvedValue([fakeError2]);
    jest.mocked(getEmailErrors).mockResolvedValue([fakeError]);

    await signupValidators(req, res, next);

    const expected = [
      { path: "username", message: fakeError2 },
      { path: "email", message: fakeError },
      { path: "password", message: fakeError },
      { path: "confirmPassword", message: fakeError2 },
    ];

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it(`should return an error response with a status code of ${ERROR_CODE_UNPROCESSED_ENTITY} and payload of the errors if all the validators return multiple errors`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([fakeError, fakeError2]);
    jest
      .mocked(getConfirmPasswordErrors)
      .mockReturnValue([fakeError, fakeError2]);
    jest.mocked(getUsernameErrors).mockResolvedValue([fakeError, fakeError2]);
    jest.mocked(getEmailErrors).mockResolvedValue([fakeError, fakeError2]);

    await signupValidators(req, res, next);

    const expected = [
      { path: "username", message: fakeError },
      { path: "username", message: fakeError2 },
      { path: "email", message: fakeError },
      { path: "email", message: fakeError2 },
      { path: "password", message: fakeError },
      { path: "password", message: fakeError2 },
      { path: "confirmPassword", message: fakeError },
      { path: "confirmPassword", message: fakeError2 },
    ];

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it(`should call next if no error is returned from any of the validators`, async () => {
    jest.mocked(getPasswordErrors).mockReturnValue([]);
    jest.mocked(getConfirmPasswordErrors).mockReturnValue([]);
    jest.mocked(getUsernameErrors).mockResolvedValue([]);
    jest.mocked(getEmailErrors).mockResolvedValue([]);

    await signupValidators(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

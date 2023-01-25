import bcyrpt from "bcryptjs";

import { ERROR_CODE_UNPROCESSED_ENTITY } from "../../../../controllers/utils/constants";
import User from "../../../../models/User";

import { LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS } from "../constants";

import loginValidator from ".";

jest.mock("../../../../models/User");
jest.mock("bcryptjs");

describe("Auth Validator - Login", () => {
  let req: any = {
    body: {
      email: "",
      password: "",
    },
  };

  const res: any = {};
  const next = jest.fn();
  const errors = [
    { path: "login", message: LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
  });

  it("it should throw an error if there is no email and password", async () => {
    await loginValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(errors);
  });

  it("it should throw an error if there is no email", async () => {
    req.body.password = "123";
    await loginValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(errors);
  });

  it(`it should throw an error if the email isn't valid but the password is valid`, async () => {
    req.body.email = "abc";
    req.body.password = "123";
    await loginValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(errors);
  });

  it(`it should throw an error if the email and password is valid but no user is found`, async () => {
    User.get = jest.fn().mockResolvedValue(null);

    req.body.email = "abc@anyrealemailformat.com";
    req.body.password = "123";
    await loginValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(errors);
  });

  it(`it should throw an error if the email and password is valid, and a user is found without a password`, async () => {
    User.get = jest.fn().mockResolvedValue({ email: "fake@email.com" });

    req.body.email = "abc@anyrealemailformat.com";
    req.body.password = "123";
    await loginValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(errors);
  });

  it(`it should throw an error if the email and password is valid, and a user is found with a password that doesn't match`, async () => {
    User.get = jest
      .fn()
      .mockResolvedValue({ email: "fake@email.com", password: "fakePassword" }); // encryption is mocked to return false, so the fake password data doesn't have to match
    bcyrpt.compare = jest.fn().mockResolvedValue(false);

    req.body.email = "abc@anyrealemailformat.com";
    req.body.password = "123";
    await loginValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
    expect(res.json).toHaveBeenCalledWith(errors);
  });

  it(`it should throw an error if the email and password is valid, and a user is found with a password that doesn't match`, async () => {
    const fakeId = "fakeId";

    User.get = jest.fn().mockResolvedValue({
      _id: fakeId,
      email: "fake@email.com",
      password: "fakePassword",
    }); // encryption is mocked to return false, so the fake password data doesn't have to match
    bcyrpt.compare = jest.fn().mockResolvedValue(true);

    req.body.email = "abc@anyrealemailformat.com";
    req.body.password = "123";
    await loginValidator(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req).toHaveProperty("userId", fakeId);
  });
});

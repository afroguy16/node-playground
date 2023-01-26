import bcyrpt from "bcryptjs";

import {
  LOGIN_ERROR_MESSAGE_FAILED,
  SIGNUP_ERROR_MESSAGE_FAILED,
} from "../../middlewares/validators/auth/constants";
import User from "../../models/User";

import {
  ERROR_CODE_UNPROCESSED_ENTITY,
  SUCCESS_CODE,
  SUCCESS_CODE_CREATED,
  SUCCES_MESSAGE_GENERIC,
} from "../utils/constants";
import EmailService from "../utils/services/EmailService";

import { postLogin, postSignup } from ".";

jest.mock("bcryptjs");
jest.mock("../../models/User");
jest.mock("../utils/services/EmailService");

// NB: Controller test will pass without complying with any validation because validations are a separate middleware
describe("Auth Controllers", () => {
  describe("Signup Controller", () => {
    const req: any = {
      body: {
        username: "fake username",
        email: "fake text with zero validation",
        password: "s",
      },
    };

    const res: any = {};

    beforeEach(() => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it(`should send an error response if generating salt throws an error`, async () => {
      const error = new Error("any rejection value");
      jest.mocked(bcyrpt.genSalt).mockImplementation(() => {
        throw error;
      });

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
      expect(res.json).toHaveBeenCalledWith({
        message: SIGNUP_ERROR_MESSAGE_FAILED,
        error,
      });
    });

    it(`should send an error response if generating an hash throws an error`, async () => {
      const error = new Error("any rejection value");
      jest.mocked(bcyrpt.hash).mockImplementation(() => {
        throw error;
      });

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
      expect(res.json).toHaveBeenCalledWith({
        message: SIGNUP_ERROR_MESSAGE_FAILED,
        error,
      });
    });

    it(`should send a success response when user was created successfully`, async () => {
      jest.mocked(User.create).mockResolvedValue({ status: true });
      jest.mocked(EmailService.send).mockResolvedValue("any fake value");

      req.username = "fake username";
      req.email = "fake text with zero validation";
      req.password = "s";

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE_CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: SUCCES_MESSAGE_GENERIC,
      });
    });

    it(`should send an error when creating has an error but sending an email calls was successful`, async () => {
      const error = "any rejection value";

      jest.mocked(User.create).mockRejectedValue(error);
      jest.mocked(EmailService.send).mockResolvedValue("any fake value");

      req.username = "";
      req.email = "fake text with zero validation";
      req.password = "s";

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
      expect(res.json).toHaveBeenCalledWith({
        message: SIGNUP_ERROR_MESSAGE_FAILED,
        error,
      });
    });

    it(`should send a success response and then console log an error when creating a user was successful but sending an email wasn't`, async () => {
      (globalThis as any).console = { log: jest.fn() };

      const error = "any rejection value";

      jest.mocked(User.create).mockResolvedValue({ status: true });
      jest.mocked(EmailService.send).mockRejectedValue(error);

      req.username = "fake username";
      req.email = "fake text with zero validation";
      req.password = "s";

      await postSignup(req, res);

      expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE_CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: SUCCES_MESSAGE_GENERIC,
      });
      expect(console.log).toHaveBeenCalledWith(error);
    });
  });

  describe("Login Controller", () => {
    const req: any = {
      body: {},
    };

    const res: any = {};

    beforeEach(() => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it(`should send an error response if there is no userId in the modified request body`, async () => {
      await postLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(ERROR_CODE_UNPROCESSED_ENTITY);
      expect(res.json).toHaveBeenCalledWith({
        message: LOGIN_ERROR_MESSAGE_FAILED,
      });
    });

    it(`should send a success response if there is a userId in the modified request body`, async () => {
      req.userId = "s";
      await postLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE);
      expect(res.json).toHaveBeenCalledWith({
        message: SUCCES_MESSAGE_GENERIC,
      });
    });
  });
});

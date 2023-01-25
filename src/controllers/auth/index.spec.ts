import { SIGNUP_ERROR_MESSAGE_FAILED } from "../../middlewares/validators/auth/constants";
import User from "../../models/User";

import {
  ERROR_CODE_UNPROCESSED_ENTITY,
  SUCCESS_CODE_CREATED,
  SUCCES_MESSAGE_GENERIC,
} from "../utils/constants";
import EmailService from "../utils/services/EmailService";

import { postSignup } from ".";

jest.mock("../../models/User");
jest.mock("../utils/services/EmailService");

// NB: Controller test will pass without complying with any validation because validations are a separate middleware
describe("Signup Controller", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it(`should send a success response when body content for one field is blank`, async () => {
    jest.mocked(User.create).mockResolvedValue({ status: true });
    jest.mocked(EmailService.send).mockResolvedValue("any fake value");

    const req = {
      body: {
        username: "",
        email: "fake text with zero validation",
        password: "s",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE_CREATED);
    expect(res.json).toHaveBeenCalledWith({ message: SUCCES_MESSAGE_GENERIC });
  });

  it(`should send a success response when body content for all fields are blank`, async () => {
    jest.mocked(User.create).mockResolvedValue({ status: true });
    jest.mocked(EmailService.send).mockResolvedValue("any fake value");

    const req = {
      body: {
        username: "",
        email: "",
        password: "",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE_CREATED);
    expect(res.json).toHaveBeenCalledWith({ message: SUCCES_MESSAGE_GENERIC });
  });

  it(`should send a success response when all body content are present`, async () => {
    jest.mocked(User.create).mockResolvedValue({ status: true });
    jest.mocked(EmailService.send).mockResolvedValue("any fake value");

    const req = {
      body: {
        username: "fake username",
        email: "fake text with zero validation",
        password: "s",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE_CREATED);
    expect(res.json).toHaveBeenCalledWith({ message: SUCCES_MESSAGE_GENERIC });
  });

  it(`should send an error when creating has an error but sending an email calls was successful`, async () => {
    const error = "any rejection value";

    jest.mocked(User.create).mockRejectedValue(error);
    jest.mocked(EmailService.send).mockResolvedValue("any fake value");

    const req = {
      body: {
        username: "",
        email: "fake text with zero validation",
        password: "s",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

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

    const req = {
      body: {
        username: "fake username",
        email: "fake text with zero validation",
        password: "s",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await postSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(SUCCESS_CODE_CREATED);
    expect(res.json).toHaveBeenCalledWith({ message: SUCCES_MESSAGE_GENERIC });
    expect(console.log).toHaveBeenCalledWith(error);
  });
});

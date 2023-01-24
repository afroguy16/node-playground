import { validationResult } from "express-validator";
import bcyrpt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/User";
import {
  ERROR_CODE_SERVER,
  ERROR_CODE_UNPROCESSED_ENTITY,
  SUCCESS_CODE,
  SUCCESS_CODE_CREATED,
} from "./constants";
import EmailService from "./shared/services/EmailService";
import { OfficialEmailE } from "./shared/services/EmailService/enums";
import signup from "./shared/services/EmailService/templates/signupTemplate";
import {
  EMAIL_ERROR_MESSAGE_INVALID_TYPE,
  SIGNUP_ERROR_MESSAGE_FAILED,
  TO_MOVE_VARIABLE_HASH_KEY,
} from "../middlewares/validators/auth/constants";
import ResetPasswordToken from "../models/ResetPasswordToken";
import resetPassword from "./shared/services/EmailService/templates/resetPassword";

export const postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = req.validator.getErrors();

  if (req.validator.hasError()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: SIGNUP_ERROR_MESSAGE_FAILED, error: errors });
  }

  try {
    const salt = await bcyrpt.genSalt(12);
    const crypted = await bcyrpt.hash(password, salt);

    await User.create({ email, password: crypted, username });
    res
      .status(SUCCESS_CODE_CREATED)
      .json({ message: "User created successfully" });

    await EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: { ...signup },
    });
  } catch (e) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: SIGNUP_ERROR_MESSAGE_FAILED, error: e });
  }
};

export const postLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: SIGNUP_ERROR_MESSAGE_FAILED, error: errors.array() });
  }

  const token = jwt.sign(
    {
      email: req.pendingLoggedInUser.email,
      userId: req.pendingLoggedInUser._id,
    },
    TO_MOVE_VARIABLE_HASH_KEY,
    { expiresIn: "1h" }
  );

  try {
    res.status(SUCCESS_CODE).json({ message: "Auth was successful", token });
  } catch (e) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: SIGNUP_ERROR_MESSAGE_FAILED, error: e });
  }
};

export const postRequestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const tokenBuffer = crypto.randomBytes(32);
    const token = tokenBuffer.toString("hex");
    const expiration = Date.now() + 3600000;

    await ResetPasswordToken.create({
      email,
      token,
      expiration,
    });

    res.status(SUCCESS_CODE).json({ message: "OK" });

    await EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: resetPassword(token),
    });
  } catch (e) {
    console.log(e);
  }
};

export const postResetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.get({ email });

    if (user) {
      const salt = await bcyrpt.genSalt(12);
      const crypted = await bcyrpt.hash(password, salt);
      await User.update({ _id: user._id, password: crypted });
    }

    // await ResetPasswordToken.delete(tokenId); - TODO - delete after use

    res.status(SUCCESS_CODE).json({ message: "OK" });
  } catch (e) {
    res.status(ERROR_CODE_SERVER).json({ message: "failed" });
  }
};

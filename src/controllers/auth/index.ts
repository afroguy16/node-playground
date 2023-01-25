import { validationResult } from "express-validator";
import bcyrpt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import {
  SIGNUP_ERROR_MESSAGE_FAILED,
  TO_MOVE_VARIABLE_HASH_KEY,
} from "../../middlewares/validators/auth/constants";
import ResetPasswordToken from "../../models/ResetPasswordToken";

import resetPassword from "../utils/services/EmailService/templates/resetPassword";
import {
  ERROR_CODE_SERVER,
  ERROR_CODE_UNPROCESSED_ENTITY,
  SUCCESS_CODE,
  SUCCESS_CODE_CREATED,
  SUCCES_MESSAGE_GENERIC,
} from "../utils/constants";
import EmailService from "../utils/services/EmailService";
import { OfficialEmailE } from "../utils/services/EmailService/enums";
import signup from "../utils/services/EmailService/templates/signupTemplate";
import { Request, Response } from "express";

/**
 * Controller - Receives raw request from the signup routes, encrypt password and create a new user with the User model, then returns a success response if the user creation is successful, but throw an error if it's not or if there are some other errors. Then send an email to the newly created user and log the email to the console if there was an error in sending the email.
 * @async
 * @param {Request} req - The Request object from the Router
 * @param {Response} res - The Response object that is used to send error to the client if validation fails
 */
export const postSignup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcyrpt.genSalt(12);
    const crypted = await bcyrpt.hash(password, salt);

    await User.create({ email, password: crypted, username });
    res.status(SUCCESS_CODE_CREATED).json({ message: SUCCES_MESSAGE_GENERIC });

    EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: { ...signup },
    }).catch((e) => console.log(e));
  } catch (e) {
    res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: SIGNUP_ERROR_MESSAGE_FAILED, error: e });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const { email } = req.body;
  const modifiedRequest = req as Request & { userId: string | undefined };

  const token = jwt.sign(
    {
      email,
      userId: modifiedRequest.userId,
    },
    TO_MOVE_VARIABLE_HASH_KEY,
    { expiresIn: "1h" }
  );

  try {
    res.status(SUCCESS_CODE).json({ message: SUCCES_MESSAGE_GENERIC, token });
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

    res.status(SUCCESS_CODE).json({ message: SUCCES_MESSAGE_GENERIC });

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

    res.status(SUCCESS_CODE).json({ message: SUCCES_MESSAGE_GENERIC });
  } catch (e) {
    res.status(ERROR_CODE_SERVER).json({ message: "failed" });
  }
};

import { validationResult } from "express-validator";
import bcyrpt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User";
import {
  ERROR_CODE_UNPROCESSED_ENTITY,
  SUCCESS_CODE,
  SUCCESS_CODE_CREATED,
} from "../constants";
import EmailService from "../shared/services/EmailService";
import { OfficialEmailE } from "../shared/services/EmailService/enums";
import signup from "../shared/services/EmailService/templates/signup";

export const postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  const errors = req.validator.getErrors();

  console.log({ errors });

  if (req.validator.hasError()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: "Auth failed", error: errors });
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
    console.log(e);
  }
};

export const postLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: "Auth failed", error: errors.array() });
  }

  const token = jwt.sign(
    {
      email: req.pendingLoggedInUser.email,
      userId: req.pendingLoggedInUser._id,
    },
    "this is some long ass ",
    { expiresIn: "1h" }
  );

  try {
    res.status(SUCCESS_CODE).json({ message: "Auth was successful", token });
  } catch (e) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: "Auth failed", error: e });
  }
};

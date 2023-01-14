import bcyrpt from "bcryptjs";
import crypto from "crypto";
import { validationResult } from "express-validator";
import { EMAIL_ERROR_MESSAGE_INVALID_TYPE } from "../middlewares/validators/auth/constants";

import ResetPasswordToken from "../models/ResetPasswordToken";
import User from "../models/User";
import { ERROR_CODE_UNPROCESSED_ENTITY } from "./constants";
import EmailService from "./shared/services/EmailService";
import { OfficialEmailE } from "./shared/services/EmailService/enums";
import resetPassword from "./shared/services/EmailService/templates/resetPassword";
import signup from "./shared/services/EmailService/templates/signup";

export const getLogin = (req, res) => {
  res.render("auth/login", {
    pathName: "login",
    pageTitle: "Login",
    data: { email: undefined, password: undefined },
  });
};

export const postLogin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).render("auth/login", {
      pathName: "login",
      pageTitle: "Login",
      error: errors.array()[0].msg,
      data: { email, password },
    });
  }

  const reqSessionPendingLogginedInUserStr = JSON.stringify(
    req.session.pendingLoggedInUser
  );
  req.session.user = JSON.parse(reqSessionPendingLogginedInUserStr);
  req.session.pendingLoggedInUser = undefined;
  res.redirect("/");
};

export const getSignup = (req, res) => {
  res.render("auth/signup", {
    pathName: "signup",
    pageTitle: "Sign up",
    data: {
      username: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
  });
};

export const postSignup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).render("auth/signup", {
      pathName: "signup",
      pageTitle: "Sign up",
      error: errors.array()[0].msg,
      data: { username, email, password, confirmPassword },
    });
  }

  try {
    const salt = await bcyrpt.genSalt(12);
    const crypted = await bcyrpt.hash(password, salt);

    await User.create({ email, password: crypted, username });
    res.redirect("/login");

    await EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: { ...signup },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getRequestPasswordReset = (req, res) => {
  res.render("auth/request-password-reset", {
    pathName: "request-password-reset",
    pageTitle: "Request Password Reset",
    data: { email: undefined },
  });
};

export const postRequestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .render("auth/request-password-reset", {
        pathName: "request-password-reset",
        pageTitle: "Request Password Reset",
        data: { email },
        error:
          errors.array()[0].msg === EMAIL_ERROR_MESSAGE_INVALID_TYPE
            ? errors.array()[0].msg
            : "",
      });
  }

  try {
    const tokenBuffer = crypto.randomBytes(32);
    const token = tokenBuffer.toString("hex");
    const expiration = Date.now() + 3600000;

    await ResetPasswordToken.create({
      userId: req.session.pendingLoggedInUser._id,
      token,
      expiration,
    });

    res.redirect("/login");

    await EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: resetPassword(token),
    });
  } catch (e) {
    console.log(e);
  }
};

export const getResetPassword = async (req, res) => {
  const token = req.params.token;
  const tokenObject = await ResetPasswordToken.get(token);

  if (!tokenObject) {
    return res.redirect("/login");
  }

  const isTokenValid = tokenObject.expiration > Date.now();
  if (isTokenValid) {
    res.render("auth/reset", {
      pathName: "reset",
      pageTitle: "Reset Password",
      data: {
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
      },
      token,
    });
  } else {
    // don't wait for delete
    ResetPasswordToken.delete(tokenObject._id);
    res.redirect("/login");
  }
};

export const postResetPassword = async (req, res, next) => {
  const { email, password, confirmPassword, token } = req.body; // TODO - add confirmPassword validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).render("auth/reset", {
      pathName: "reset",
      pageTitle: "Reset Password",
      error: errors.array()[0].msg,
      data: { email, password, confirmPassword },
      token,
    });
  }

  try {
    const userId = req.session.resetPasswordUser._id;
    const user = await User.getById(userId);

    if (user) {
      const salt = await bcyrpt.genSalt(12);
      const crypted = await bcyrpt.hash(password, salt);
      await User.update({ _id: userId, password: crypted });
    }
    const tokenId = req.session.resetPasswordTokenObject;
    await ResetPasswordToken.delete(tokenId);

    // clean up session temp variables
    req.session.resetPasswordUser = undefined;
    req.session.resetPasswordTokenObject = undefined;

    res.redirect("/login");
  } catch (e) {
    console.log(e);
  }
};

export const postLogout = async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

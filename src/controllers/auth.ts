import bcyrpt from "bcryptjs";
import crypto from "crypto";
import { validationResult } from "express-validator";

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
  });
};

export const postLogin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).render("auth/login", {
      pathName: "login",
      pageTitle: "Login",
      error: errors.array()[0].msg,
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
  });
};

export const postSignup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(ERROR_CODE_UNPROCESSED_ENTITY).render("auth/signup", {
      pathName: "signup",
      pageTitle: "Sign up",
      error: errors.array()[0].msg,
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

export const getRequestPasswordReset = (req, res, next) => {
  res.render("auth/request-password-reset", {
    pathName: "request-password-reset",
    pageTitle: "Request Password Reset",
    // error: req.flash("error"),
  });
};

export const postLogout = async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

export const postRequestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  try {
    const tokenBuffer = crypto.randomBytes(32);
    const token = tokenBuffer.toString("hex");
    const user = await User.get({ email });

    if (!user) {
      // req.flash(INVALID_CREDENTIALS);
      return res.redirect("/login");
    }

    const expiration = Date.now() + 3600000;
    await ResetPasswordToken.create({ userId: user._id, token, expiration });

    await EmailService.send({
      to: email,
      from: OfficialEmailE.SUPPORT,
      template: resetPassword(token),
    });

    res.redirect("/login");
  } catch (e) {
    console.log(e);
  }
};

export const getResetPassword = async (req, res, next) => {
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

  try {
    // TODO - create a job that deletes expired token from the DB
    const tokenObject = await ResetPasswordToken.get(token);

    if (!tokenObject) {
      return res.redirect("/login");
    }

    const isTokenValid = tokenObject.expiration > Date.now();

    if (isTokenValid) {
      const user = await User.getById(tokenObject.userId);

      if (user?.email === email) {
        const salt = await bcyrpt.genSalt(12);
        const crypted = await bcyrpt.hash(password, salt);
        await User.update({ _id: tokenObject.userId, password: crypted });
      }
    }

    ResetPasswordToken.delete(tokenObject._id);
    res.redirect("/login");
  } catch (e) {
    console.log(e);
  }
};

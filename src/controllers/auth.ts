import bcyrpt from "bcryptjs";

import User from "../models/User";

export const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pathName: "login",
    pageTitle: "Login",
    error: req.flash("error"),
  });
};

const INVALID_CREDENTIALS = "Invalid email or password";

export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.flash("error"));

  try {
    const user = await User.get({ email });

    if (!user) {
      req.flash("error", INVALID_CREDENTIALS);
      return res.redirect("/signup");
    }

    const matched = await bcyrpt.compare(password, user.password);

    if (!matched) {
      req.flash("error", INVALID_CREDENTIALS);
      return res.redirect("/login");
    }

    req.session.user = user;
    res.redirect("/");
  } catch (e) {
    console.log(e);
    req.flash("error", INVALID_CREDENTIALS);
    res.redirect("/login");
  }
};

export const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pathName: "signup",
    pageTitle: "Sign up",
    error: req.flash("error"),
  });
};

export const postSignup = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const salt = await bcyrpt.genSalt(12);
  const crypted = await bcyrpt.hash(password, salt);
  try {
    // TODO - fix this hack! ensure that only the email is sent by fixing the type and making it compactible, i.e. accept email or password as an optional field
    const user = await User.get({ email });
    console.log(user);
    if (user) {
      return res.redirect("/signup");
    }
    await User.create({ email, password: crypted, name: "Jo" });
    res.redirect("/login");
  } catch (e) {
    console.log(e);
  }
};

export const postLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

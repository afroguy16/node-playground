import User from "../models/User";

export const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pathName: "login",
    pageTitle: "Login",
    isLoggedIn: req.session.user?._id,
  });
};

export const postLogin = async (req, res, next) => {
  try {
    const user = await User.get("63bac083deab7ea88de46a97");
    req.session.user = user;
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

export const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pathName: "signup",
    pageTitle: "Sign up",
    isLoggedIn: req.session.user?._id,
  });
};

export const postSignup = async (req, res, next) => {
  try {
    // const user = await User.get("63bac083deab7ea88de46a97");
    // req.session.user = user
    // res.redirect('/')
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

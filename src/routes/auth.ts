import express from "express";

import {
  getLogin,
  getRequestPasswordReset,
  getSignup,
  postLogin,
  postLogout,
  postResetPassword,
  postRequestPasswordReset,
  postSignup,
  getResetPassword,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/login", getLogin);

authRouter.post("/login", postLogin);

authRouter.get("/signup", getSignup);

authRouter.get("/request-password-reset", getRequestPasswordReset);

authRouter.post("/request-password-reset", postRequestPasswordReset);

authRouter.get("/reset/:token", getResetPassword);

authRouter.post("/reset", postResetPassword);

authRouter.post("/signup", postSignup);

authRouter.post("/logout", postLogout);

export default authRouter;

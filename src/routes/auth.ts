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
import useLoginValidators from "../middlewares/validators/auth/login/useLoginValidators";
import useSignupValidators from "../middlewares/validators/auth/signup/useSignupValidators";

const authRouter = express.Router();

authRouter.get("/login", getLogin);

authRouter.post("/login", useLoginValidators, postLogin);

authRouter.get("/signup", getSignup);

authRouter.post("/signup", useSignupValidators, postSignup);

authRouter.get("/request-password-reset", getRequestPasswordReset);

authRouter.post("/request-password-reset", postRequestPasswordReset);

authRouter.get("/reset/:token", getResetPassword);

authRouter.post("/reset", postResetPassword);

authRouter.post("/logout", postLogout);

export default authRouter;

import express from "express";

import {
  postLogin,
  postRequestPasswordReset,
  postResetPassword,
  postSignup,
} from "../controllers/auth";
import useLoginValidators from "../middlewares/validators/auth/login/useLoginValidators";
import useRequestPasswordResetValidators from "../middlewares/validators/auth/update-password/requestPasswordReset/useRequestPasswordResetValidators";
import useSignupValidators from "../middlewares/validators/auth/signup/useSignupValidators";
import useResetPasswordValidators from "../middlewares/validators/auth/update-password/resetPassword/useResetPasswordValidators";

export const authRouter = express.Router();

authRouter.post("/signup", useSignupValidators, postSignup);

authRouter.post("/login", useLoginValidators, postLogin);

authRouter.post(
  "/request-password-reset",
  useRequestPasswordResetValidators,
  postRequestPasswordReset
);

authRouter.post(
  "/reset-password",
  useResetPasswordValidators,
  postResetPassword
);

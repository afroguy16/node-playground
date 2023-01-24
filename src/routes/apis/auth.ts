import express from "express";

import {
  postLogin,
  postRequestPasswordReset,
  postResetPassword,
  postSignup,
} from "../../controllers/replica-for-apis/auth";
import useLoginValidators from "../../middlewares/validators/auth/login/useLoginValidators";
import useRequestPasswordResetValidators from "../../middlewares/validators/auth/update-password/requestPasswordReset/useRequestPasswordResetValidators";
import useSignupValidators from "../../middlewares/validators/auth/signup/useSignupValidators";
import useResetPasswordValidators from "../../middlewares/validators/auth/update-password/resetPassword/useResetPasswordValidators";

export const authApiRouter = express.Router();

authApiRouter.post("/signup", useSignupValidators, postSignup);

authApiRouter.post("/login", useLoginValidators, postLogin);

authApiRouter.post(
  "/request-password-reset",
  useRequestPasswordResetValidators,
  postRequestPasswordReset
);

authApiRouter.post(
  "/reset-password",
  useResetPasswordValidators,
  postResetPassword
);

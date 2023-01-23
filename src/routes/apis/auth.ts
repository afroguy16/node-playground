import express from "express";

import {
  postLogin,
  postRequestPasswordReset,
  postSignup,
} from "../../controllers/replica-for-apis/auth";
import useLoginValidators from "../../middlewares/validators/auth/login/useLoginValidators";
import useRequestPasswordResetValidators from "../../middlewares/validators/auth/requestPasswordReset/useRequestPasswordResetValidators";
import useSignupValidators from "../../middlewares/validators/auth/signup/useSignupValidators";

export const authApiRouter = express.Router();

authApiRouter.post("/signup", useSignupValidators, postSignup);

authApiRouter.post("/login", useLoginValidators, postLogin);

authApiRouter.post(
  "/request-password-reset",
  useRequestPasswordResetValidators,
  postRequestPasswordReset
);

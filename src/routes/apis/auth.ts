import express from "express";

import { postLogin, postSignup } from "../../controllers/replica-for-apis/auth";
import useLoginValidators from "../../middlewares/validators/auth/login/useLoginValidators";
import useSignupValidators from "../../middlewares/validators/auth/signup/useSignupValidators";

export const authApiRouter = express.Router();

authApiRouter.post("/signup", useSignupValidators, postSignup);

authApiRouter.post("/login", useLoginValidators, postLogin);

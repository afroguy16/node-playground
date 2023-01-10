import express from "express";

import {
  getLogin,
  getSignup,
  postLogin,
  postLogout,
  postSignup,
} from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/login", getLogin);

authRouter.post("/login", postLogin);

authRouter.get("/signup", getSignup);

authRouter.post("/signup", postSignup);

authRouter.post("/logout", postLogout);

export default authRouter;

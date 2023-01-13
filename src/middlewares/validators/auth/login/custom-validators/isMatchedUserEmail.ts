import { Request } from "express-validator/src/base";
import User from "../../../../../models/User";
import { LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS } from "../../constants";

export default async (email: string, req: Request) => {
  if (email === "") {
    console.log("got called");
    throw new Error(LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS);
  }
  try {
    const user = await User.get({ email });

    if (user) {
      req.session.pendingLoggedInUser = user;
      return true;
    }

    throw new Error(LOGIN_ERROR_MESSAGE_INVALID_CREDENTIALS);
  } catch (e) {
    console.log(e);
  }
};

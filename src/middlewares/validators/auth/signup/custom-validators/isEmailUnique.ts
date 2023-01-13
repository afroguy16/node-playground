import User from "../../../../../models/User";

import { EMAIL_UNAVAILABLE_ADDRESS } from "../../constants";

export default async (email: string) => {
  try {
    const user = await User.get({ email });
    if (user) {
      throw new Error(EMAIL_UNAVAILABLE_ADDRESS);
    } else {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

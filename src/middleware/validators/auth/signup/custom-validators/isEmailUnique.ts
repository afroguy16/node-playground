import User from "../../../../../models/User";

import { EMAIL_UNAVAILABLE_ADDRESS } from "../constants";

export default async (email: string) => {
  const user = await User.get({ email });
  if (user) {
    throw new Error(EMAIL_UNAVAILABLE_ADDRESS);
  } else {
    return true;
  }
};

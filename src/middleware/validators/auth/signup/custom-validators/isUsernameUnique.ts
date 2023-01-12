import User from "../../../../../models/User";

import { USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS } from "../constants";

export default async (username: string) => {
  const user = await User.get({ username });
  if (user) {
    throw new Error(USERNAME_ERROR_MESSAGE_UNAVAILABLE_ADDRESS);
  } else {
    return true;
  }
};

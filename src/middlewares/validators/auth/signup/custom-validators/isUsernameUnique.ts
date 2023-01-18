import User from "../../../../../models/User";

export default async (username: string) => {
  const user = await User.get({ username });
  if (user) {
    return false;
  } else {
    return true;
  }
};

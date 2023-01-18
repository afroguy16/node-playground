import User from "../../../../../models/User";

export default async (email: string) => {
  const user = await User.get({ email });
  if (user) {
    return false;
  } else {
    return true;
  }
};

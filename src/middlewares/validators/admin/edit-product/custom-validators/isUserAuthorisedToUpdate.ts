import User from "../../../../../models/User";

export default async (productUserId: string, userId: string) => {
  const user = await User.getById(userId);

  return Boolean(productUserId === user?._id);
};

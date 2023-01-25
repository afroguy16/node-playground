import bcyrpt from "bcryptjs";

export default async (bodyPassword: string, userPassword: string) => {
  if (userPassword) {
    const matched = await bcyrpt.compare(bodyPassword, userPassword);
    if (matched) {
      return true;
    }
  }

  return false;
};

import ResetPasswordToken from "../../../../../models/ResetPasswordToken";
import { RESET_PASSWORD_TOKEN_BAD } from "../../constants";

export default async (token: string, email: string) => {
  if (!token) {
    return [RESET_PASSWORD_TOKEN_BAD];
  }

  const resetPasswordTokenObject = await ResetPasswordToken.get(token);

  if (!resetPasswordTokenObject || resetPasswordTokenObject.email !== email) {
    return [RESET_PASSWORD_TOKEN_BAD];
  }

  if (resetPasswordTokenObject.expiration <= Date.now()) {
    ResetPasswordToken.delete(resetPasswordTokenObject._id);
    return [RESET_PASSWORD_TOKEN_BAD];
  }

  return [];
};

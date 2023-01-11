import { WriteResponse } from "../../utils/interfaces";

import {
  ResetPasswordTokenAttributes,
  ResetPasswordTokenModel,
} from "./interfaces";
import ResetPasswordTokenService from "./ResetPasswordToken.Service";

class ResetPasswordToken implements ResetPasswordTokenModel {
  async create(
    payload: Omit<ResetPasswordTokenAttributes, "_id">
  ): Promise<WriteResponse> {
    return ResetPasswordTokenService.create(payload);
  }

  async get(token: string): Promise<ResetPasswordTokenAttributes | null> {
    return ResetPasswordTokenService.get(token);
  }

  async delete(id: string): Promise<WriteResponse> {
    return ResetPasswordTokenService.delete(id);
  }
}

export default new ResetPasswordToken();

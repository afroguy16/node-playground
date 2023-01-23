import { model, Schema } from "mongoose";

import { WriteResponse } from "../../../utils/interfaces";

import {
  ResetPasswordTokenAttributes,
  ResetPasswordTokenModel,
} from "../interfaces";

const resetPasswordTokenAttributesSchema =
  new Schema<ResetPasswordTokenAttributes>({
    email: {
      type: String,
      ref: "ResetPasswordToken",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiration: {
      type: Number,
      required: true,
    },
  });

const ResetPasswordToken = model<ResetPasswordTokenAttributes>(
  "ResetPasswordToken",
  resetPasswordTokenAttributesSchema
);

export default class ResetPasswordTokenMongooseProviderService
  implements ResetPasswordTokenModel
{
  async create(
    payload: Omit<ResetPasswordTokenAttributes, "_id">
  ): Promise<WriteResponse> {
    const resetPasswordToken = new ResetPasswordToken(payload);
    await resetPasswordToken.save();
    return { status: true };
  }

  async get(token: string): Promise<ResetPasswordTokenAttributes | null> {
    return ResetPasswordToken.findOne({ token });
  }

  async delete(id: string): Promise<WriteResponse> {
    await ResetPasswordToken.findByIdAndRemove(id);
    return { status: true };
  }
}

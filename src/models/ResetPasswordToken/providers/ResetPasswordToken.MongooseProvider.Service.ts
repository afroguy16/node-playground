import { model, Schema } from "mongoose";

import { WriteResponse } from "../../../utils/interfaces";

import {
  ResetPasswordTokenAttributes,
  ResetPasswordTokenModel,
} from "../interfaces";

interface ResetPasswordTokenAttributesSchema
  extends Omit<ResetPasswordTokenAttributes, "userId"> {
  userId: Schema.Types.ObjectId;
}

const resetPasswordTokenAttributesSchema =
  new Schema<ResetPasswordTokenAttributesSchema>({
    userId: {
      type: Schema.Types.ObjectId,
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

const ResetPasswordToken = model<ResetPasswordTokenAttributesSchema>(
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

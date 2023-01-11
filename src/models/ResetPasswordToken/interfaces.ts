import { WriteResponse } from "../../utils/interfaces";

export interface ResetPasswordTokenAttributes {
  _id: string;
  token: string;
  userId: string;
  expiration: number;
}

export interface ResetPasswordTokenModel {
  create: (
    payload: Omit<ResetPasswordTokenAttributes, "_id">
  ) => Promise<WriteResponse>;
  get: (token: string) => Promise<ResetPasswordTokenAttributes | null>;
  delete: (id: string) => Promise<WriteResponse>;
}

import { WriteResponse } from "../../utils/interfaces";
import { Optional } from "../../utils/types";
import { CartAttributes } from "../Embedded/Cart/interfaces";

export interface UserAttributes {
  _id: string;
  username: string;
  password?: string;
  email: string;
  cart?: CartAttributes;
}

export type GetUserPayload = Partial<UserAttributes>;

export interface UserModel {
  create: (payload: Omit<UserAttributes, "_id">) => Promise<WriteResponse>;
  getAll: () => Promise<Array<UserAttributes>>;
  get: (payload: GetUserPayload) => Promise<UserAttributes | null>;
  getById: (id: string) => Promise<UserAttributes | null>;
  update: (
    payload: Optional<UserAttributes, "cart" | "username" | "email">
  ) => Promise<WriteResponse>;
}

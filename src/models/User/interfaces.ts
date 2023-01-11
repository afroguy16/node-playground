import { WriteResponse } from "../../utils/interfaces";
import { CartAttributes } from "../Embedded/Cart/interfaces";

export interface UserAttributes {
  _id: string;
  username: string;
  password?: string;
  email: string;
  cart?: CartAttributes;
}

export interface GetUserPayload {
  [key: string]: keyof UserAttributes;
}

export interface UserModel {
  create: (payload: Omit<UserAttributes, "_id">) => Promise<WriteResponse>;
  getAll: () => Promise<Array<UserAttributes>>;
  get: (payload: GetUserPayload) => Promise<UserAttributes | null>;
  getById: (id: string) => Promise<UserAttributes | null>;
  update: (payload: UserAttributes) => Promise<WriteResponse>;
}

import { WriteResponse } from "../../utils/interfaces";
import { CartAttributes } from "../Embedded/Cart/interfaces";

export interface UserAttributes {
  _id: string;
  name: string;
  email: string;
  cart?: CartAttributes;
}

export interface UserModel {
  create: (payload: Omit<UserAttributes, "_id">) => Promise<WriteResponse>;
  getAll: () => Promise<Array<UserAttributes>>;
  get: (id: string) => Promise<UserAttributes | null>;
  update: (payload: UserAttributes) => Promise<WriteResponse>;
}

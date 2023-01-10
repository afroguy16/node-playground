import { WriteResponse } from "../../utils/interfaces";
import { Optional } from "../../utils/types";

import { UserAttributes, UserModel } from "./interfaces";
import UserService from "./User.Service";

class User implements UserModel {
  create(payload: Omit<UserAttributes, "_id">): Promise<WriteResponse> {
    return UserService.create(payload);
  }

  getAll(): Promise<Array<UserAttributes>> {
    return UserService.getAll();
  }

  get(id: string): Promise<UserAttributes | null> {
    return UserService.get(id);
  }

  update(
    payload: Optional<UserAttributes, "cart" | "name" | "email">
  ): Promise<WriteResponse> {
    return UserService.update(payload);
  }
}

export default new User();

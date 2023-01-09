import { WriteResponse } from "../../utils/interfaces";

import { UserAttributes, UserModel } from "./interfaces";
import UserService from "./User.Service";

// TODO - Add call back types for calls without one e.g. {message: string('succesfful deleted')}. but we need to confirm if the lack of error is equal to success before adding call back types

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

  update(payload: UserAttributes): Promise<WriteResponse> {
    return UserService.update(payload);
  }
}

export default new User();

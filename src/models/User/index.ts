import { UserAttributes, UserModel } from "./interfaces";
import UserService from "./User.Service";

// TODO - Add call back types for calls without one e.g. {message: string('succesfful deleted')}. but we need to confirm if the lack of error is equal to success before adding call back types

class Product implements UserModel {
  create(payload: Omit<UserAttributes, "_id">) {
    return UserService.create(payload);
  }

  getAll(): Promise<Array<UserAttributes>> {
    return UserService.getAll();
  }

  get(id: string): Promise<UserAttributes> {
    return UserService.get(id);
  }

  update(payload: UserAttributes) {
    return UserService.update(payload);
  }
}

export default new Product();

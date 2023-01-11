import { model, Schema } from "mongoose";

import { WriteResponse } from "../../../utils/interfaces";
import { Optional } from "../../../utils/types";

import { CartAttributes } from "../../Embedded/Cart/interfaces";
import { GetUserPayload, UserAttributes, UserModel } from "../interfaces";

const userSchema = new Schema<UserAttributes & { cart: CartAttributes }>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: {
      products: {
        _id: false,
        type: [
          {
            productId: {
              type: Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    },
    _id: false,
    required: false,
  },
});

const User = model<UserAttributes>("User", userSchema);

export default class UserMongooseProviderService implements UserModel {
  async create(payload: Omit<UserAttributes, "_id">): Promise<WriteResponse> {
    const user = new User(payload);
    await user.save();
    return { status: true };
  }

  async getAll(): Promise<Array<UserAttributes>> {
    return User.find();
  }

  async getById(id: string): Promise<UserAttributes | null> {
    return User.findById(id);
  }

  async get(payload: GetUserPayload): Promise<UserAttributes | null> {
    return User.findOne(payload);
  }

  async update(
    payload: Optional<UserAttributes, "cart" | "username" | "email">
  ): Promise<WriteResponse> {
    const { _id, ...update } = payload;
    const filter = { _id };

    await User.findOneAndUpdate(filter, update);
    return { status: true };
  }
}

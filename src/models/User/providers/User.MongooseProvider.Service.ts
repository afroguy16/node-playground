import { model, Schema } from "mongoose";

import { WriteResponse } from "../../../utils/interfaces";

import { CartAttributes } from "../../Cart/interfaces";
import { UserAttributes, UserModel } from "../interfaces";

const userSchema = new Schema<UserAttributes & { cart: CartAttributes }>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    type: {
      products: [
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

  async get(id: string): Promise<UserAttributes | null> {
    return User.findById(id);
  }

  async update(payload: UserAttributes): Promise<WriteResponse> {
    const { _id, ...update } = payload;
    const filter = { _id };

    await User.findOneAndUpdate(filter, update);
    return { status: true };
  }
}

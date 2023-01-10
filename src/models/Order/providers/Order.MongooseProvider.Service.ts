import { model, Schema } from "mongoose";

import { WriteResponse } from "../../../utils/interfaces";
import { Status } from "../enums";
import { OrderAttributes, OrderModel } from "../interfaces";

interface OrderAttributesSchema extends Omit<OrderAttributes, "userId"> {
  userId: Schema.Types.ObjectId;
}

const orderSchema = new Schema<OrderAttributesSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [
        {
          type: {
            authorId: Schema.Types.ObjectId,
            quantity: Number,
            totalPrice: Number,
            title: String,
            imageUrl: String,
            description: String,
            price: Number,
          },
          _id: false,
          required: true,
        },
      ],
      _id: false,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<Omit<OrderAttributes, "userId">>("Order", orderSchema);

export default class OrderMongooseProviderService implements OrderModel {
  async create(
    payload: Omit<OrderAttributes, "_id" | "status" | "createdAt">
  ): Promise<WriteResponse> {
    const order = new Order({ ...payload, status: Status.DEFAULT });
    await order.save();
    return { status: true };
  }

  async get(userId: string): Promise<Array<OrderAttributes>> {
    return Order.find({ userId: { $in: userId } });
  }

  async getOne(orderId: string): Promise<OrderAttributes | null> {
    return Order.findById(orderId);
  }

  async updateStatus(orderId: string, status: Status): Promise<any> {
    const filter = { _id: orderId };

    await Order.findOneAndUpdate(filter, { status });
    return { status: true };
  }
}

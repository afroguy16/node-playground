const mongodb = require("mongodb");

import { getDb } from "../../../utils/database-providers/mongodbDriver";
import { WriteResponse } from "../../../utils/interfaces";

import { Status } from "../enums";
import { OrderAttributes, OrderModel } from "../interfaces";

const COLLECTION = "orders";

export default class OrderMongoProviderService implements OrderModel {
  private getCollection() {
    return getDb().collection(COLLECTION);
  }

  async create(
    payload: Omit<OrderAttributes, "_id" | "status" | "createdAt">
  ): Promise<WriteResponse> {
    try {
      await this.getCollection().insertOne({
        ...payload,
        status: Status.DEFAULT,
      });
      return { status: true };
    } catch (e) {
      throw e;
    }
  }

  async get(userId: string): Promise<Array<OrderAttributes>> {
    return this.getCollection()
      .find({
        userId: new mongodb.ObjectId(userId),
      })
      .toArray();
  }

  async getOne(orderId: string): Promise<OrderAttributes | null> {
    return this.getCollection().findOne({
      _id: new mongodb.ObjectId(orderId),
    });
  }

  async updateStatus(orderId: string, status: Status): Promise<any> {
    return this.getCollection().updateOne(
      { _id: new mongodb.ObjectId(orderId) },
      { $set: { status } }
    );
  }
}

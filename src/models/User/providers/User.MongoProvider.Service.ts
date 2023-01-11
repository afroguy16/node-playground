const mongodb = require("mongodb");

import { getDb } from "../../../utils/database";
import { Optional } from "../../../utils/types";
import { GetUserPayload, UserAttributes, UserModel } from "../interfaces";

export default class UserMongoProviderService implements UserModel {
  private getCollection() {
    return getDb().collection("users");
  }

  async create(payload: Omit<UserAttributes, "_id">) {
    return this.getCollection().insertOne(payload);
  }

  async getAll() {
    return this.getCollection().find().toArray();
  }

  async getById(id: string): Promise<UserAttributes | null> {
    const _id = new mongodb.ObjectId(id);
    return this.getCollection().findOne({ _id });
  }

  async get(payload: GetUserPayload): Promise<UserAttributes | null> {
    return this.getCollection().findOne(payload);
  }

  async update(
    payload: Optional<UserAttributes, "cart" | "username" | "email">
  ) {
    const { _id, ...restPayload } = payload;

    return this.getCollection().updateOne(
      { _id: new mongodb.ObjectId(_id) },
      { $set: restPayload }
    );
  }
}

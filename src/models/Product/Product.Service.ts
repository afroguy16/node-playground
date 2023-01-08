const mongodb = require("mongodb");

import { getDb } from "../../utils/database";

import { ProductAttributes, ProductModel } from "./interfaces";

class ProductService implements ProductModel {
  private getCollection() {
    return getDb().collection("products");
  }

  async create(payload: Omit<ProductAttributes, "_id">) {
    return this.getCollection().insertOne(payload);
  }

  async getAll() {
    return this.getCollection().find().toArray();
  }

  async get(id: string) {
    const _id = new mongodb.ObjectId(id);
    return this.getCollection().findOne({ _id });
  }

  async getMultiple(ids: Array<string>) {
    return this.getCollection()
      .find({ _id: { $in: ids } })
      .toArray();
  }

  async update(payload: ProductAttributes) {
    const { _id, ...restPayload } = payload;

    return this.getCollection().updateOne(
      { _id: new mongodb.ObjectId(_id) },
      { $set: restPayload }
    );
  }

  async delete(id: string) {
    return this.getCollection().deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

export default new ProductService();

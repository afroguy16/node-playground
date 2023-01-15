import { model, Schema } from "mongoose";
import { ITEMS_PER_PAGE } from "../../../controllers/constants";

import { WriteResponse } from "../../../utils/interfaces";
import { Optional } from "../../../utils/types";

import {
  GetProductsInterface,
  ProductAttributes,
  ProductModel,
} from "../interfaces";

interface ProductAttributesSchema extends Omit<ProductAttributes, "userId"> {
  userId: Schema.Types.ObjectId;
}

const productSchema = new Schema<ProductAttributesSchema>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = model<ProductAttributesSchema>("Product", productSchema);

export default class ProductMongooseProviderService implements ProductModel {
  async create(
    payload: Omit<ProductAttributes, "_id">
  ): Promise<WriteResponse> {
    const product = new Product(payload);
    await product.save();
    return { status: true };
  }

  // TODO - Proposal -Add to interface
  async getAllProductsCount(): Promise<number> {
    return Product.count();
  }

  async getAll(
    payload?: GetProductsInterface
  ): Promise<Array<ProductAttributes>> {
    const page = payload?.pagination?.page;
    const filter = payload?.filter;
    const itemsPerPage = page ? ITEMS_PER_PAGE : 0;

    return Product.find(filter!)
      .skip((page! - 1) * itemsPerPage)
      .limit(itemsPerPage) as any;
  }

  async get(id: string): Promise<ProductAttributes | null> {
    return Product.findById(id);
  }

  // TODO - Proposal - cancelled, here for reference(add to Interface) -
  // New thought - do not add to interface, use the getAll method instead
  async getByFilter(payload: {
    [key: string]: keyof ProductAttributes;
  }): Promise<Array<ProductAttributes>> {
    return this.getAll({ filter: payload });
  }

  // Fix the name to be more explanatory
  async getMultiple(ids: Array<string>): Promise<Array<ProductAttributes>> {
    return Product.find({ _id: { $in: ids } });
  }

  async update(
    payload: Optional<ProductAttributes, keyof Omit<ProductAttributes, "_id">>
  ): Promise<WriteResponse> {
    const { _id, ...update } = payload;
    const filter = { _id };

    await Product.findOneAndUpdate(filter, update);
    return { status: true };
  }

  async delete(id: string): Promise<WriteResponse> {
    await Product.findByIdAndRemove(id);
    return { status: true };
  }
}

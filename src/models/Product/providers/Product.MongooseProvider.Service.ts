import { model, Schema } from "mongoose";
import { WriteResponse } from "../../Order/interfaces";
import { ProductAttributes, ProductModel } from "../interfaces";

const productSchema = new Schema<ProductAttributes>({
  userId: {
    type: String,
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

const Product = model<ProductAttributes>("Product", productSchema);

export default class ProductMongooseProviderService implements ProductModel {
  async create(
    payload: Omit<ProductAttributes, "_id">
  ): Promise<WriteResponse> {
    const product = new Product(payload);
    await product.save();
    return { status: true };
  }

  async getAll(): Promise<Array<ProductAttributes>> {
    return Product.find();
  }

  async get(id: string): Promise<ProductAttributes | null> {
    return Product.findById(id);
  }

  async getMultiple(ids: Array<string>): Promise<Array<ProductAttributes>> {
    return Product.find({ _id: { $in: ids } });
  }

  async update(payload: ProductAttributes): Promise<WriteResponse> {
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

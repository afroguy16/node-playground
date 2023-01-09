import { WriteResponse } from "../Order/interfaces";

import { ProductAttributes, ProductModel } from "./interfaces";
import ProductService from "./Product.Service";

class Product implements ProductModel {
  create(payload: Omit<ProductAttributes, "_id">) {
    return ProductService.create(payload);
  }

  getAll(): Promise<Array<ProductAttributes>> {
    return ProductService.getAll();
  }

  get(id: string): Promise<ProductAttributes | null> {
    return ProductService.get(id);
  }

  getMultiple(ids: Array<string>): Promise<Array<ProductAttributes>> {
    return ProductService.getMultiple(ids);
  }

  update(payload: ProductAttributes): Promise<WriteResponse> {
    return ProductService.update(payload);
  }

  delete(id: string): Promise<WriteResponse> {
    return ProductService.delete(id);
  }
}

export default new Product();

import { WriteResponse } from "../../utils/interfaces";
import { Optional } from "../../utils/types";
import {
  GetProductsInterface,
  ProductAttributes,
  ProductModel,
} from "./interfaces";
import ProductService from "./Product.Service";

class Product implements ProductModel {
  create(payload: Omit<ProductAttributes, "_id">) {
    return ProductService.create(payload);
  }

  async getAllProductsCount(): Promise<number> {
    return ProductService.getAllProductsCount();
  }

  getAll(payload?: GetProductsInterface): Promise<Array<ProductAttributes>> {
    return ProductService.getAll(payload);
  }

  get(id: string): Promise<ProductAttributes | null> {
    return ProductService.get(id);
  }

  // TODO - add to Interface and other Provider classes
  getByFilter(payload: {
    [key: string]: keyof ProductAttributes;
  }): Promise<Array<ProductAttributes>> {
    return ProductService.getByFilter(payload);
  }

  getMultiple(ids: Array<string>): Promise<Array<ProductAttributes>> {
    return ProductService.getMultiple(ids);
  }

  update(
    payload: Optional<ProductAttributes, keyof Omit<ProductAttributes, "_id">>
  ): Promise<WriteResponse> {
    return ProductService.update(payload);
  }

  delete(id: string): Promise<WriteResponse> {
    return ProductService.delete(id);
  }
}

export default new Product();

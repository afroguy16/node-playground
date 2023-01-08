import { ProductAttributes, ProductModel } from "./interfaces";
import ProductService from "./Product.Service";

// TODO - Add call back types for calls without one e.g. {message: string('succesfful deleted')}. but we need to confirm if the lack of error is equal to success before adding call back types

class Product implements ProductModel {
  create(payload: Omit<ProductAttributes, "_id">) {
    return ProductService.create(payload);
  }

  getAll(): Promise<Array<ProductAttributes>> {
    return ProductService.getAll();
  }

  get(id: string): Promise<ProductAttributes> {
    return ProductService.get(id);
  }

  update(payload: ProductAttributes) {
    return ProductService.update(payload);
  }

  delete(id: string) {
    return ProductService.delete(id);
  }
}

export default new Product();

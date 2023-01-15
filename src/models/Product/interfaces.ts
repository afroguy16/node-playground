import { WriteResponse } from "../../utils/interfaces";
import { Optional } from "../../utils/types";

export interface ProductAttributes {
  _id: string;
  userId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface GetProductsInterface {
  pagination?: {
    page: number;
  };
  filter?: {
    [key: string]: keyof ProductAttributes;
  };
}

export interface ProductModel {
  create: (payload: Omit<ProductAttributes, "_id">) => Promise<WriteResponse>;
  getAll: () => Promise<Array<ProductAttributes>>;
  get: (id: string) => Promise<ProductAttributes | null>;
  getMultiple: (ids: Array<string>) => Promise<any>;
  update: (
    payload: Optional<ProductAttributes, keyof Omit<ProductAttributes, "_id">>
  ) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

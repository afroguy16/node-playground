import { ProductAttributes } from "../Product/interfaces";

export interface CartProductAttributes {
  productId: string;
  quantity: number;
}

export interface CartAttributes {
  products: Array<CartProductAttributes>;
}

export interface ReplaceCartPayload {
  userId: string;
  cart: CartAttributes;
}

export interface AddToCartPayload {
  userId: string;
  productId: string;
}

export interface CartWithCompleteProductAttributes
  extends Omit<ProductAttributes, "userId"> {
  authorId: string;
  quantity: number;
  totalPrice: number;
}

export interface CartModel {
  add: (payload: AddToCartPayload) => Promise<any>;
  get: (userId: string) => Promise<any>;
  getProductIds: (userId: string) => Promise<any>;
  clear: (userId: string) => Promise<any>;
  delete: (userId: string, productId: string) => Promise<any>;
  deleteMultiple: (userId: string, productIds: Array<string>) => Promise<any>;
}

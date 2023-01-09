import CartService from "./Cart.Service";
import { AddToCartPayload, CartModel } from "./interfaces";

class Cart implements CartModel {
  async add(payload: AddToCartPayload) {
    return CartService.add(payload);
  }

  async get(userId: string) {
    return CartService.get(userId);
  }

  async getProductIds(userId: string) {
    return CartService.getProductIds(userId);
  }

  async delete(userId: string, productId: string) {
    return CartService.delete(userId, productId);
  }

  async deleteMultiple(userId: string, ids: Array<string>) {
    return CartService.deleteMultiple(userId, ids);
  }

  async clear(userId: string) {
    return CartService.clear(userId);
  }
}

export default new Cart();

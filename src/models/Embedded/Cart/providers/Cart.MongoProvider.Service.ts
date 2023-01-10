const mongodb = require("mongodb");

import { getDb } from "../../../../utils/database";
import Product from "../../../Product";
import {
  AddToCartPayload,
  CartAttributes,
  CartModel,
  CartWithCompleteProductAttributes,
  ReplaceCartPayload,
} from "../interfaces";

const COLLECTION = "users";

export default class CartService implements CartModel {
  private getCollection() {
    return getDb().collection(COLLECTION);
  }

  private async replace(payload: ReplaceCartPayload) {
    const { userId, cart } = payload;

    return this.getCollection().updateOne(
      { _id: new mongodb.ObjectId(userId) },
      { $set: { cart } }
    );
  }

  async add(payload: AddToCartPayload) {
    const { userId, productId } = payload;
    const parsedProductId = new mongodb.ObjectId(productId);

    const users = await this.getCollection();
    const user = await users.findOne({ _id: new mongodb.ObjectId(userId) });

    const cart: CartAttributes = user?.cart
      ? { ...user.cart }
      : { products: [] };

    const exisingProductIndex = cart.products.findIndex((product) => {
      return (
        JSON.stringify(product.productId) === JSON.stringify(parsedProductId)
      );
    });

    if (exisingProductIndex >= 0) {
      cart.products[exisingProductIndex] = {
        productId: cart.products[exisingProductIndex].productId,
        quantity: cart.products[exisingProductIndex].quantity + 1,
      };
    } else {
      cart.products.push({
        productId: parsedProductId,
        quantity: 1,
      });
    }

    this.replace({ userId, cart });
  }

  async get(userId: string) {
    const _id = new mongodb.ObjectId(userId);
    const user = await this.getCollection().findOne({ _id });

    const productIds = user.cart?.products?.map((product) => product.productId);

    if (productIds?.length > 0) {
      const products = await Product.getMultiple(productIds);

      // TODO - delete product from the user cart that are no longer available (e.g. deleted by the admin)- done
      // TODO - move to its own function
      if (products.length > 0) {
        const memToCompare: { [key: string]: boolean } = {};

        // insert the products to be compared into a temporary memory
        products.forEach((product) => {
          memToCompare[product._id] = true;
        });

        const filteredIds = productIds.filter((id) =>
          Boolean(!memToCompare[id])
        );
        await this.deleteMultiple(userId, filteredIds);
      } else {
        await this.deleteMultiple(userId, productIds);
      }

      const updatedProducts: Array<CartWithCompleteProductAttributes> = [];
      let index = 0;
      let totalPrice = 0;

      for (const product of products) {
        const productQuantity = user.cart.products[index].quantity;
        const productTotalPrice = product.price * productQuantity;
        totalPrice += productTotalPrice;

        const { userId, ...restProps } = product;
        updatedProducts.push({
          ...restProps,
          authorId: userId,
          quantity: productQuantity,
          totalPrice: productTotalPrice,
        });

        index++;
      }

      return { products: updatedProducts, totalPrice };
    }
    return { products: [], totalPrice: 0 };
  }

  async getProductIds(userId: string) {
    const _id = new mongodb.ObjectId(userId);
    const user = await this.getCollection().findOne({ _id });
    return user.cart;
  }

  async delete(userId: string, productId: string) {
    const cart = await this.getProductIds(userId);
    const filteredCartProducts = cart.products.filter(
      (product) =>
        product.productId.toString() !==
        new mongodb.ObjectId(productId).toString()
    );
    return this.replace({ userId, cart: { products: filteredCartProducts } });
  }

  async deleteMultiple(userId: string, ids: Array<string>) {
    const cart = await this.getProductIds(userId);
    const memToCompare: { [key: string]: boolean } = {};

    // insert the products to be compared into a temporary memory
    ids.forEach((id) => {
      memToCompare[id] = true;
    });

    // filter out any product which is part of the ids past to the function to be deleted
    const filteredCartProducts = cart.products.filter(
      (product) => !Boolean(memToCompare[product.productId])
    );

    // build a new cart from the filtered products, then replace it with the user existing cart
    return this.replace({ userId, cart: { products: filteredCartProducts } });
  }

  async clear(userId: string) {
    return this.replace({ userId, cart: { products: [] } });
  }
}

import Product from "../../../../Product";
import { ProductAttributes } from "../../../../Product/interfaces";
import User from "../../../../User";

import {
  AddToCartPayload,
  CartAttributes,
  CartModel,
  CartWithCompleteProductAttributes,
  ReplaceCartPayload,
} from "../../interfaces";

export default class CartProviderProviderBase implements CartModel {
  private async replace(payload: ReplaceCartPayload) {
    const { userId, cart } = payload;
    return User.update({ _id: userId, cart });
  }

  // remove products in the product id array from the cart that are no longer available
  private async cleanUp(
    availableProducts: Array<ProductAttributes>,
    productIdsToCheck: Array<string>,
    userId: string
  ) {
    if (availableProducts.length > 0) {
      const memToCompare: { [key: string]: boolean } = {};

      // insert the products to be compared into a temporary memory
      availableProducts.forEach((product) => {
        memToCompare[product._id] = true;
      });

      const filteredIds = productIdsToCheck.filter((id) =>
        Boolean(!memToCompare[id])
      );
      await this.deleteMultiple(userId, filteredIds);
    } else {
      await this.deleteMultiple(userId, productIdsToCheck);
    }
  }

  async add(payload: AddToCartPayload) {
    const { userId, productId } = payload;
    const user = await User.getById(userId);

    const cart: CartAttributes = user?.cart ? user.cart : { products: [] };

    const exisingProductIndex = cart.products.findIndex((product) => {
      return JSON.stringify(product.productId) === JSON.stringify(productId);
    });

    if (exisingProductIndex >= 0) {
      cart.products[exisingProductIndex] = {
        productId: cart.products[exisingProductIndex].productId,
        quantity: cart.products[exisingProductIndex].quantity + 1,
      };
    } else {
      cart.products.push({
        productId,
        quantity: 1,
      });
    }

    this.replace({ userId, cart });
  }

  async get(userId: string) {
    const user = await User.getById(userId);

    const productIds = user?.cart?.products?.map(
      (product) => product.productId
    );

    if (productIds && productIds.length > 0) {
      const products = await Product.getMultiple(productIds);

      // remove products from cart which are no longer available
      this.cleanUp(products, productIds, userId);

      const updatedProducts: Array<CartWithCompleteProductAttributes> = [];
      let index = 0;
      let totalPrice = 0;

      for (const product of products) {
        const productQuantity = user?.cart?.products[index].quantity || 0;
        const productTotalPrice = product.price * productQuantity;
        totalPrice += productTotalPrice;

        const { userId, _id, title, imageUrl, description, price } = product;
        const propsToUse = { userId, _id, title, imageUrl, description, price };
        updatedProducts.push({
          ...propsToUse,
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
    const user = await User.getById(userId);
    return user?.cart;
  }

  async delete(userId: string, productId: string) {
    const cart = await this.getProductIds(userId);
    const filteredCartProducts =
      cart?.products.filter((product) => {
        return product.productId.toString() !== productId.toString();
      }) || [];
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
    const filteredCartProducts =
      cart?.products.filter(
        (product) => !Boolean(memToCompare[product.productId])
      ) || [];

    // // build a new cart from the filtered products, then replace it with the user existing cart
    return this.replace({ userId, cart: { products: filteredCartProducts } });
  }

  async clear(userId: string) {
    return this.replace({ userId, cart: { products: [] } });
  }
}

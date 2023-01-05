import fs from "fs";
import path from "path";

import {
  getCartFromFile,
  getSelectedCartProduct,
  rootDirectory,
} from "../utils";
import Product, { ProductState } from "./Product";

const FILE_PATH = path.join(rootDirectory, "data", "cart.json");

interface CartProduct {
  id: string;
  quantity: number;
}

export interface CartState {
  products: Array<CartProduct>;
  totalPrice: number;
}

export type GetCartProductCallback = (
  product: CartProduct | undefined,
  index: number
) => void;

export type GetCartCallback = (cart: CartState) => void;

class Cart {
  getCart(callback: GetCartCallback) {
    getCartFromFile(FILE_PATH, callback);
  }

  getProduct(cart: CartState, id: string, callback: GetCartProductCallback) {
    getSelectedCartProduct(cart, id, callback);
  }

  add(id: string, productPrice: number, callback) {
    this.getCart((cart) => {
      this.getProduct(cart, id, (existingProduct, index) => {
        let updatedCart = { ...cart };
        let updatedProduct: CartProduct;

        if (existingProduct) {
          updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          };
          updatedCart.products[index] = updatedProduct;
        } else {
          updatedProduct = { id, quantity: 1 };
          updatedCart.products = [...updatedCart.products, updatedProduct];
        }

        updatedCart.totalPrice += Number(productPrice);

        fs.writeFile(FILE_PATH, JSON.stringify(updatedCart), (error) => {
          error && console.log(error);
          callback();
        });
      });
    });
  }

  remove(id: string, callback) {
    this.getCart((cart) => {
      if (cart.products.length > 0) {
        this.getProduct(cart, id, (existingProduct, index) => {
          let updatedCart = { ...cart };

          Product.fetchProduct(id)
            .then(([wrappedProduct]) => {
              const product: ProductState = wrappedProduct[0];
              const productPrice = product?.price || 0;

              if (existingProduct) {
                const priceToBeDeducted =
                  existingProduct.quantity * productPrice;
                updatedCart.products.splice(index, 1);
                updatedCart.totalPrice -= Number(priceToBeDeducted);
              }

              fs.writeFile(FILE_PATH, JSON.stringify(updatedCart), (error) => {
                error && console.log(error);
                callback();
              });
            })
            .catch();
        });
      } else {
        callback();
      }
    });
  }
}

export default new Cart();

import fs from "fs";
import path from "path";
import {
  CartState,
  GetCartCallback,
  GetCartProductCallback,
} from "../models/Cart";

export const rootDirectory = path.dirname(require.main!.filename);

export const getCartFromFile = (path: string, callback: GetCartCallback) => {
  fs.readFile(path, (err, fileContent) => {
    let cart: CartState = {
      products: [],
      totalPrice: 0,
    };

    if (!err) {
      cart = JSON.parse(fileContent.toString());
    } else {
      console.log(err);
    }

    callback(cart);
  });
};

export const getSelectedCartItem = (
  cart: CartState,
  id: number,
  callback: GetCartProductCallback
) => {
  const existingProductIndex = cart.products.findIndex(
    (product) => product.id === id
  );

  console.log(cart.products[existingProductIndex], existingProductIndex);

  callback(cart.products[existingProductIndex], existingProductIndex);
};

export const isEmpty = (array: Array<unknown>) => array.length < 1;

import fs from "fs";
import path from "path";
import {
  CartState,
  GetCartCallback,
  GetCartProductCallback,
} from "../models/Cart";
import {
  GetProductCallback,
  GetProductsCallback,
  ProductState,
} from "../models/Product";

export const rootDirectory = path.dirname(require.main!.filename);

export const getProductsFromFile = (
  path: string,
  callback: GetProductsCallback
) => {
  fs.readFile(path, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

export const getSelectedProduct = (
  path: string,
  productId: string,
  callback: GetProductCallback
) => {
  getProductsFromFile(path, (products: Array<ProductState>) => {
    const selectedProductIndex = products.findIndex(
      (product: ProductState) => product.id === productId
    );
    const selectedProduct = products[selectedProductIndex];
    callback(selectedProduct, selectedProductIndex);
  });
};

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

export const getSelectedCartProduct = (
  cart: CartState,
  id: string,
  callback: GetCartProductCallback
) => {
  const existingProductIndex = cart.products.findIndex(
    (product) => product.id === id
  );

  callback(cart.products[existingProductIndex], existingProductIndex);
};

export const isEmpty = (array: Array<unknown>) => array.length < 1;

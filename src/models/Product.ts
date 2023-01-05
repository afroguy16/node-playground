import fs from "fs";
import path from "path";

import {
  getProductsFromFile,
  getSelectedProduct,
  rootDirectory,
} from "../utils";
import Cart from "./Cart";

export interface ProductState {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export type GetProductCallback = (
  product: ProductState | undefined,
  index: number
) => void;

export type GetProductsCallback = (product: Array<ProductState>) => void;

const FILE_PATH = path.join(rootDirectory, "data", "products.json");
const CART_FILE_PATH = path.join(rootDirectory, "data", "cart.json");

export default class Product {
  state: ProductState = {
    id: "",
    title: "",
    imageUrl: "",
    description: "",
    price: 0,
  };

  constructor(
    id: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.state.id = id;
    this.state.title = title;
    this.state.imageUrl = imageUrl;
    this.state.description = description;
    this.state.price = price;
  }

  static fetchAll(callback: GetProductsCallback) {
    getProductsFromFile(FILE_PATH, callback);
  }

  static fetchProduct(callback: GetProductCallback, productId: string) {
    getSelectedProduct(FILE_PATH, productId, callback);
  }

  private createPackagedProductData(id: string) {
    return {
      id,
      title: this.state.title,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      price: this.state.price,
    };
  }

  save() {
    Product.fetchAll((products) => {
      const updatedProducts = [...products];

      Product.fetchProduct((product, index) => {
        if (!product) {
          const generatedId = Math.random().toString();
          updatedProducts.push(this.createPackagedProductData(generatedId));
        } else {
          updatedProducts[index] = this.createPackagedProductData(product.id);
        }

        fs.writeFile(
          FILE_PATH,
          JSON.stringify(updatedProducts),
          (err) => err && console.log(err)
        );
      }, this.state.id);
    });
  }

  static delete(id: string) {
    Product.fetchAll((products) => {
      const updatedProducts = [...products].filter(
        (product) => product.id !== id
      );

      fs.writeFile(FILE_PATH, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.remove(id, () => {});
        } else {
          console.log(err);
        }
      });
    });
  }
}

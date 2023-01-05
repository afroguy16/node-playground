import fs from "fs";
import path from "path";

import {
  getProductsFromFile,
  getSelectedProduct,
  rootDirectory,
} from "../utils";
import db from "../utils/database";

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

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static fetchProduct(id: string) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES(?, ?, ?, ?)",
      [
        this.state.title,
        this.state.price,
        this.state.imageUrl,
        this.state.description,
      ]
    );
  }

  static delete(id: string) {
    Product.fetchAll()
      .then(([products]) => {
        const updatedProducts = [...(products as any)].filter(
          (product) => product.id !== id
        );

        fs.writeFile(FILE_PATH, JSON.stringify(updatedProducts), (err) => {
          if (!err) {
            Cart.remove(id, () => {});
          } else {
            console.log(err);
          }
        });
      })
      .catch();
  }
}

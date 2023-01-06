import fs from "fs";
import path from "path";

import SequelizedProduct from "../services/database/Product";
import { rootDirectory } from "../utils";

import Cart from "./Cart";

export interface ProductState {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface ProductAttributes {
  state: ProductState;
}

export type GetProductCallback = (
  error?: Error,
  product?: ProductState
) => void;

export type GetProductsCallback = (product: Array<ProductState>) => void;

const FILE_PATH = path.join(rootDirectory, "data", "products.json");

class Product {
  fetchAll() {
    return SequelizedProduct.findAll({ raw: true });
  }

  fetchProduct(id: number) {
    return SequelizedProduct.findByPk(id, { raw: true });
  }

  fetchWrappedProduct(id: number) {
    return SequelizedProduct.findByPk(id);
  }

  create(payload: Omit<ProductState, "id">, callback: GetProductCallback) {
    const { title, description, price, imageUrl } = payload;
    SequelizedProduct.create({
      title,
      description,
      price,
      imageUrl,
    })
      .then((data) => callback(undefined, data))
      .catch((err) => callback(new Error(err)));
  }

  update(payload: ProductState, callback: GetProductCallback) {
    const { id, title, description, price, imageUrl } = payload;
    this.fetchWrappedProduct(id)
      .then((product) => {
        if (!product?.dataValues) {
          throw new Error(`Cannot retrieve product with ID ${id}`);
        } else {
          product.title = title;
          product.description = description;
          product.price = price;
          product.imageUrl = imageUrl;
          return product.save();
        }
      })
      .then((data) => callback(undefined, data))
      .catch((err) => callback(new Error(err)));
  }

  delete(id: number, callback) {
    // Product.fetchAll()
    //   .then(([products]) => {
    //     const updatedProducts = [...(products as any)].filter(
    //       (product) => product.id !== id
    //     );

    //     fs.writeFile(FILE_PATH, JSON.stringify(updatedProducts), (err) => {
    //       if (!err) {
    //         Cart.remove(id, () => { });
    //       } else {
    //         console.log(err);
    //       }
    //     });
    //   })
    //   .catch();
    this.fetchWrappedProduct(id)
      .then((product) => product?.destroy())
      .then((data) => {
        callback(data);
      })
      .catch((err) => console.log(err));
  }
}

export default new Product();

import fs from "fs";
import path from "path";

import rootDirectory from "../utils/path";

const FILE_PATH = path.join(rootDirectory, "data", "products.json");

const getProductsFromFile = (callback) => {
  fs.readFile(FILE_PATH, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

export interface ProductState {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default class Product {
  state: ProductState = {
    title: "",
    imageUrl: "",
    description: "",
    price: 0,
  };

  constructor(
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.state.title = title;
    this.state.imageUrl = imageUrl;
    this.state.description = description;
    this.state.price = price;
  }

  save() {
    getProductsFromFile((products: Array<ProductState>) => {
      products.push({
        title: this.state.title,
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        price: this.state.price,
      });

      fs.writeFile(FILE_PATH, JSON.stringify(products), (err) =>
        console.log(err)
      );
    });
  }

  static async fetchAll(callback) {
    getProductsFromFile(callback);
  }
}

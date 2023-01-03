import fs from "fs";
import path from "path";

import rootDirectory from "../utils/path";

const FILE_PATH = path.join(rootDirectory, "data", "products.json");

export default class Product {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  save() {
    fs.readFile(FILE_PATH, (err, fileContent) => {
      let products: Array<{ title: string }> = [];

      if (!err) {
        products = JSON.parse(fileContent.toString());
      }

      products.push({ title: this.title });

      fs.writeFile(FILE_PATH, JSON.stringify(products), (err) =>
        console.log(err)
      );
    });
  }

  static async fetchAll(callback) {
    fs.readFile(FILE_PATH, (err, fileContent) => {
      if (err) {
        callback([]);
      }

      callback(JSON.parse(fileContent.toString()));
    });
  }
}

import fs from "fs";
import path from "path";

import rootDirectory from "../utils/path";

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

const getProductsFromFile = (callback) => {
  fs.readFile(FILE_PATH, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

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
    getProductsFromFile(callback);
  }

  static fetchProduct(callback: GetProductCallback, productId: string) {
    getProductsFromFile((products: Array<ProductState>) => {
      const selectedProductIndex = products.findIndex(
        (product: ProductState) => product.id === productId
      );
      console.log({ productId }, { selectedProductIndex });
      const selectedProduct = products[selectedProductIndex];
      callback(selectedProduct, selectedProductIndex);
    });
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

        fs.writeFile(FILE_PATH, JSON.stringify(updatedProducts), (err) =>
          console.log(err)
        );
      }, this.state.id);
    });
  }
}

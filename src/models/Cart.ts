import fs from "fs";
import path from "path";

import rootDirectory from "../utils/path";

const FILE_PATH = path.join(rootDirectory, "data", "cart.json");

interface Product {
  id: string;
  quantity: number;
}

interface CartState {
  products: Array<Product>;
  totalPrice: number;
}

class Cart {
  addProduct(id: string, productPrice: number) {
    fs.readFile(FILE_PATH, (err, fileContent) => {
      let cart: CartState = {
        products: [],
        totalPrice: 0,
      };

      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct: Product;

      if (existingProduct) {
        updatedProduct = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += Number(productPrice);

      fs.writeFile(FILE_PATH, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }
}

export default new Cart();

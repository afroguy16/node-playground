import SequelizedProduct from "../services/database/Product";

// TODO - Replace Callbacks with Async

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

  create(req, payload: Omit<ProductState, "id">, callback: GetProductCallback) {
    const { title, description, price, imageUrl } = payload;
    req.user
      .createSequelizedProduct({
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
    this.fetchWrappedProduct(id)
      .then((product) => product?.destroy())
      .then((data) => {
        callback(data);
      })
      .catch((err) => console.log(err));
  }
}

export default new Product();

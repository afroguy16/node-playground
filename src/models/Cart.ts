import SequelizedProduct from "../services/database/Product";

export interface CartAttributes {
  id: number;
}

export interface CartsProductsAttributes {
  id: number;
  quantity: number;
}

export interface CartState {
  products: Array<CartsProductsAttributes>;
  totalPrice: number;
}

export type GetCartProductCallback = (
  product: CartsProductsAttributes | undefined,
  index: number
) => void;

export type GetCartCallback = (cart: CartState) => void;

class Cart {
  async getCart(user) {
    return await user.getSequelizedCart();
  }

  async getAllProducts(cart) {
    return await cart.getSequelizedProducts();
  }

  async getProduct(cart, productId: number) {
    const products = await cart.getSequelizedProducts({
      where: {
        id: productId,
      },
    });
    return products[0];
  }

  async add(user, productId: number) {
    const cart = await this.getCart(user);
    let product = await this.getProduct(cart, productId);
    let quantity: number;

    if (product) {
      quantity = product.SequelizedCartsProducts.quantity + 1;
    } else {
      product = await SequelizedProduct.findByPk(productId);
      quantity = 1;
    }

    return await cart.addSequelizedProduct(product, {
      through: {
        quantity,
      },
    });
  }

  async remove(user, productId: number) {
    const cart = await this.getCart(user);
    const product = await this.getProduct(cart, productId);
    return product.SequelizedCartsProducts.destroy();
  }
}

export default new Cart();

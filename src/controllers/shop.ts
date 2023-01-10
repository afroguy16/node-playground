import Cart from "../models/Embedded/Cart";
import Order from "../models/Order";
import { ProductAttributes } from "../models/Product/interfaces";
import Product from "../models/Product";

interface CartProduct {
  product: ProductAttributes;
  quantity: number;
  totalPrice: number;
}

interface Cart {
  products: Array<CartProduct>;
  totalPrice: number;
}

export const getHome = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.render("shop/index", {
      pageTitle: "Home",
      pathName: "/",
      products,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();
    res.render("shop/product-list", {
      pageTitle: "All products",
      pathName: "/products",
      products,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.get(productId);
    res.render("shop/product-detail", {
      pageTitle: "Product Details",
      pathName: "/products",
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.get(req.user._id);
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      pathName: "/cart",
      cart,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postAddProductToCart = async (req, res, next) => {
  const { productId } = req.body;
  try {
    await Cart.add({ userId: req.user._id, productId });
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

export const postRemoveProductFromCart = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Cart.delete(req.user._id, id);
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

export const postCreateOrder = async (req, res, next) => {
  const { _id: userId } = req.user;
  try {
    const cart = await Cart.get(userId);
    const response = await Order.create({
      userId,
      products: cart.products,
      totalPrice: cart.totalPrice,
    });

    // This if check only makes sense with the assumption that mongodb fail the operation without throwing an error
    if (response.status) {
      await Cart.clear(userId);
    }

    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.get(req.user._id);
    res.render("shop/orders", {
      pageTitle: "My orders",
      pathName: "/orders",
      orders,
    });
  } catch (e) {
    console.log(e);
  }
};

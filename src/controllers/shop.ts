import Cart from "../models/Cart";
import Order from "../models/Order";
import { ProductAttributes } from "../models/Product/interfaces";
import Product from "../models/Product/Product";

interface CartProduct {
  product: ProductAttributes;
  quantity: number;
  totalPrice: number;
}

interface Cart {
  products: Array<CartProduct>;
  totalPrice: number;
}

export const pagesData = {
  cart: {
    title: "Your Cart",
    pathName: "/cart",
  },
};

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

// export const getCart = async (req, res, next) => {
//   const cart = await Cart.getCart(req.user);
//   const productsInCart = await cart?.getSequelizedProducts();

//   try {
//     res.render("shop/cart", {
//       pageTitle: pagesData.cart.title,
//       pathName: pagesData.cart.pathName,
//       cart: { id: cart.id, products: productsInCart, totalPrice: 0 },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const postAddProductToCart = async (req, res, next) => {
//   const { productId } = req.body;
//   try {
//     await Cart.add(req.user, productId);
//     res.redirect("/cart");
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const postRemoveProductFromCart = async (req, res, next) => {
//   const { id } = req.body;
//   try {
//     await Cart.remove(req.user, id);
//     res.redirect("/cart");
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const postCreateOrder = async (req, res, next) => {
//   const cart = await Cart.getCart(req.user);
//   try {
//     await Order.createOrder(req.user, cart);
//     res.redirect("/order");
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const getOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.getAllOrders(req.user);
//     res.render("shop/orders", {
//       pageTitle: "My orders",
//       pathName: "/orders",
//       orders,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

import PDFDocument from "pdfkit";

import Cart from "../models/Embedded/Cart";
import Order from "../models/Order";
import { ProductAttributes } from "../models/Product/interfaces";
import Product from "../models/Product";
import {
  DEFAULT_PAGE_NUMBER,
  ERROR_CODE_SERVER,
  ITEMS_PER_PAGE,
} from "./constants";
import Stripe from "stripe";
import StripeService from "./shared/services/PaymentService/vendors/Stripe.Service";

interface CartProduct {
  product: ProductAttributes;
  quantity: number;
  totalPrice: number;
}

interface Cart {
  products: Array<CartProduct>;
  totalPrice: number;
}

export const getProducts = async (req, res, next) => {
  const { page: paramsPage } = req.query;
  const page = paramsPage || DEFAULT_PAGE_NUMBER;
  try {
    const productCount = await Product.getAllProductsCount();
    const products = await Product.getAll({ pagination: { page } });
    res.render("shop/product-list", {
      pageTitle: "All products",
      pathName: "/",
      page: Number(page),
      pageCount: Math.ceil(productCount / ITEMS_PER_PAGE),
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
    const cart = await Cart.get(req.session.user?._id);
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
    await Cart.add({ userId: req.session.user._id, productId });
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

export const postRemoveProductFromCart = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Cart.delete(req.session.user._id, id);
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

export const getCheckout = async (req, res, next) => {
  try {
    const cart = await Cart.get(req.session.user?._id);
    const session = await StripeService.createProductCheckoutSession(
      req,
      cart.products
    );
    console.log(session);
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      pathName: "/checkout",
      cart,
      sessionId: session.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCheckoutSuccess = async (req, res, next) => {
  const { _id: userId } = req.session.user;
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

// export const postCreateOrder = async (req, res, next) => {
//   const { _id: userId } = req.session.user;
//   try {
//     const cart = await Cart.get(userId);
//     const response = await Order.create({
//       userId,
//       products: cart.products,
//       totalPrice: cart.totalPrice,
//     });

//     // This if check only makes sense with the assumption that mongodb fail the operation without throwing an error
//     if (response.status) {
//       await Cart.clear(userId);
//     }

//     res.redirect("/orders");
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.get(req.session.user?._id);
    res.render("shop/orders", {
      pageTitle: "My orders",
      pathName: "/orders",
      orders,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.getOne(orderId);
  const isUserAuthorized =
    order?.userId.toString() === req.session.user._id.toString();

  if (!isUserAuthorized) {
    const error = { status: ERROR_CODE_SERVER, error: "Invalid order request" };
    next(error);
  }

  const pdfDoc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename = ${orderId}.pdf`);

  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text("Invoice");
  order?.products.forEach((product) => {
    pdfDoc
      .fontSize(16)
      .text(
        `${product.title} - ${product.quantity} * ${product.price} | ${product.totalPrice}`
      );
  });
  pdfDoc.text(`Total price: ${order?.totalPrice}`);

  pdfDoc.end();

  pdfDoc.on("error", (e) => {
    const error = { status: ERROR_CODE_SERVER, error: e };
    next(error);
  });
};

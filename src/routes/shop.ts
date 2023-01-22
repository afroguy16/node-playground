import express from "express";

import {
  getCart,
  getCheckout,
  getCheckoutSuccess,
  getOrder,
  getOrders,
  getProduct,
  getProducts,
  postAddProductToCart,
  postRemoveProductFromCart,
} from "../controllers/shop";

import isAuth from "../middlewares/validators/auth/authenticate/authenticators/use-rest-authenticator";

const shopRouter = express.Router();

shopRouter.get("/", getProducts);

shopRouter.get(`/products/:productId`, getProduct);

shopRouter.get("/cart", isAuth, getCart);

shopRouter.post("/cart", isAuth, postAddProductToCart);

shopRouter.post("/cart-delete-item", isAuth, postRemoveProductFromCart);

shopRouter.get("/checkout", isAuth, getCheckout);

shopRouter.get("/checkout/success", isAuth, getCheckoutSuccess);

shopRouter.get("/checkout/cancel", isAuth, getCheckout);

shopRouter.get("/orders", isAuth, getOrders);

shopRouter.get("/orders/:orderId", isAuth, getOrder);

export default shopRouter;

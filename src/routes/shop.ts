import express from "express";

import {
  getCart,
  getOrder,
  getOrders,
  getProduct,
  getProducts,
  postAddProductToCart,
  postCreateOrder,
  postRemoveProductFromCart,
} from "../controllers/shop";
import { isAuth } from "../middlewares/isAuth";

const shopRouter = express.Router();

shopRouter.get("/", getProducts);

shopRouter.get(`/products/:productId`, getProduct);

shopRouter.get("/cart", isAuth, getCart);

shopRouter.post("/cart", isAuth, postAddProductToCart);

shopRouter.post("/cart-delete-item", isAuth, postRemoveProductFromCart);

shopRouter.post("/create-order", isAuth, postCreateOrder);

shopRouter.get("/orders", isAuth, getOrders);

shopRouter.get("/orders/:orderId", isAuth, getOrder);

export default shopRouter;

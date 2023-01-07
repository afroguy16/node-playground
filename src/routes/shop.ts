import express from "express";

import {
  getCart,
  getCheckout,
  getHome,
  getOrders,
  getProduct,
  getProducts,
  pagesData,
  postAddProductToCart,
  postCreateOrder,
  postRemoveProductFromCart,
} from "../controllers/shop";

const shopRouter = express.Router();

shopRouter.get("/", getHome);

shopRouter.get(pagesData.myProducts.pathName, getProducts);

shopRouter.get(`${pagesData.myProducts.pathName}/:productId`, getProduct);

shopRouter.get(pagesData.cart.pathName, getCart);

shopRouter.post(pagesData.cart.pathName, postAddProductToCart);

shopRouter.post("/cart-delete-item", postRemoveProductFromCart);

shopRouter.post("/create-order", postCreateOrder);

shopRouter.get("/orders", getOrders);

shopRouter.get(pagesData.checkout.pathName, getCheckout);

export default shopRouter;

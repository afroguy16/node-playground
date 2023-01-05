import express from "express";

import {
  getCart,
  getCheckout,
  getHome,
  getProduct,
  getProducts,
  pagesData,
  postCart,
} from "../controllers/shop";

const shopRouter = express.Router();

shopRouter.get("/", getHome);

shopRouter.get(pagesData.myProducts.pathName, getProducts);

shopRouter.get(`${pagesData.myProducts.pathName}/:productId`, getProduct);

shopRouter.get(pagesData.cart.pathName, getCart);

shopRouter.post(pagesData.cart.pathName, postCart);

shopRouter.get(pagesData.checkout.pathName, getCheckout);

export default shopRouter;

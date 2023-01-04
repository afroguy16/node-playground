import express from "express";

import {
  getCart,
  getCheckout,
  getHome,
  getProducts,
  pagesData,
} from "../controllers/shop";

const shopRouter = express.Router();

shopRouter.get("/", getHome);

shopRouter.get(pagesData.myProducts.pathName, getProducts);

shopRouter.get(pagesData.cart.pathName, getCart);

shopRouter.get(pagesData.checkout.pathName, getCheckout);

export default shopRouter;

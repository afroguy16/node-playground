import express from "express";

import {
  getAddProduct,
  getProducts,
  postAddProduct,
} from "../controllers/admin";

export const adminRouter = express.Router();

adminRouter.get("/add-product", getAddProduct);

adminRouter.get("/products", getProducts);

adminRouter.post("/add-product", postAddProduct);

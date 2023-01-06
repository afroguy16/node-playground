import express from "express";

import {
  getAddProduct,
  getEditProduct,
  getProducts,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "../controllers/admin";

export const adminRouter = express.Router();

adminRouter.get("/add-product", getAddProduct);

adminRouter.get("/products", getProducts);

adminRouter.post("/add-product", postCreateProduct);

adminRouter.get("/edit-product/:productId", getEditProduct);

adminRouter.post("/edit-product", postUpdateProduct);

adminRouter.post("/delete-product", postDeleteProduct);

import express from "express";

import {
  getCreateProduct,
  getEditProduct,
  getProducts,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "../controllers/admin";

export const adminRouter = express.Router();

adminRouter.get("/add-product", getCreateProduct);

adminRouter.get("/products", getProducts);

adminRouter.post("/add-product", postCreateProduct);

adminRouter.get("/edit-product/:productId", getEditProduct);

adminRouter.post("/edit-product", postUpdateProduct);

adminRouter.post("/delete-product", postDeleteProduct);

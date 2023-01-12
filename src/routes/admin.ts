import express from "express";

import {
  getCreateProduct,
  getEditProduct,
  getProducts,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "../controllers/admin";
import { isAuth } from "../middleware/isAuth";

export const adminRouter = express.Router();

adminRouter.get("/add-product", isAuth, getCreateProduct);

adminRouter.post("/add-product", isAuth, postCreateProduct);

adminRouter.get("/products", isAuth, getProducts);

adminRouter.get("/edit-product/:productId", isAuth, getEditProduct);

adminRouter.post("/edit-product", isAuth, postUpdateProduct);

adminRouter.post("/delete-product", isAuth, postDeleteProduct);

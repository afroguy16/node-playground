import express from "express";

import {
  getCreateProduct,
  getEditProduct,
  getProducts,
  postCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "../controllers/admin";
import { isAuth } from "../middlewares/isAuth";
import useUpdateProductValidators from "../middlewares/validators/admin/update-product/useUpdateProductValidators";

export const adminRouter = express.Router();

adminRouter.get("/add-product", isAuth, getCreateProduct);

adminRouter.post(
  "/add-product",
  isAuth,
  useUpdateProductValidators,
  postCreateProduct
);

adminRouter.get("/products", isAuth, getProducts);

adminRouter.get("/edit-product/:productId", isAuth, getEditProduct);

adminRouter.post(
  "/edit-product",
  isAuth,
  useUpdateProductValidators,
  postUpdateProduct
);

adminRouter.post("/delete-product", isAuth, postDeleteProduct);

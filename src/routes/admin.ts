import express from "express";

import {
  getProducts,
  postCreateProduct,
  patchEditProduct,
  deleteProduct,
} from "../controllers/admin";
import isAuth from "../middlewares/validators/auth/authenticate";
import useAddProductValidators from "../middlewares/validators/admin/add-product/useAddProductValidators";
import useDeleteProductValidators from "../middlewares/validators/admin/delete-product/useDeleteProductValidators";
import useEditProductValidators from "../middlewares/validators/admin/edit-product/useEditProductValidators";

export const adminApiRouter = express.Router();

adminApiRouter.post(
  "/product",
  isAuth,
  useAddProductValidators,
  postCreateProduct
);

adminApiRouter.get("/products", isAuth, getProducts);

adminApiRouter.patch(
  "/product",
  isAuth,
  useEditProductValidators,
  patchEditProduct
);

adminApiRouter.delete(
  "/product/:id",
  isAuth,
  useDeleteProductValidators,
  deleteProduct
);

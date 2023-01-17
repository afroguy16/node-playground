import express from "express";

import {
  getProducts,
  postCreateProduct,
  patchEditProduct,
  deleteProduct,
} from "../../controllers/replica-for-apis/admin";
import isAuth from "../../middlewares/isAuth";
import useDeleteProductValidators from "../../middlewares/validators/admin/delete-product/useDeleteProductValidators";
import useUpdateProductValidators from "../../middlewares/validators/admin/update-product/useUpdateProductValidators";

export const adminApiRouter = express.Router();

adminApiRouter.post(
  "/product",
  isAuth,
  useUpdateProductValidators,
  postCreateProduct
);

adminApiRouter.get("/products", isAuth, getProducts);

adminApiRouter.patch(
  "/product",
  isAuth,
  useUpdateProductValidators,
  patchEditProduct
);

adminApiRouter.delete(
  "/product/:id",
  isAuth,
  useDeleteProductValidators,
  deleteProduct
);

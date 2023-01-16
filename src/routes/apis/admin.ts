import express from "express";

import { postCreateProduct } from "../../controllers/replica-for-apis/admin";
import isAuth from "../../middlewares/isAuth";
import useUpdateProductValidators from "../../middlewares/validators/admin/update-product/useUpdateProductValidators";

export const adminApiRouter = express.Router();

adminApiRouter.post(
  "/add-product",
  isAuth,
  useUpdateProductValidators,
  postCreateProduct
);

import express from "express";

import { postCreateProduct } from "../../controllers/replica-for-apis/admin";

export const adminApiRouter = express.Router();

adminApiRouter.post(
  "/add-product",
  // isAuth,
  // useUpdateProductValidators,
  postCreateProduct
);

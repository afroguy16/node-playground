import express from "express";
import { getProducts } from "../../controllers/replica-for-apis/shop";
import isAuth from "../../middlewares/isAuth";

export const shopApiRouter = express.Router();

shopApiRouter.get("/products", isAuth, getProducts);

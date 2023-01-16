import express from "express";
import { getProducts } from "../../controllers/replica-for-apis/shop";

export const shopApiRouter = express.Router();

shopApiRouter.get("/products", getProducts);

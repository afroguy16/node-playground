import express from "express";

import { getProducts } from "../controllers/shop";

export const shopApiRouter = express.Router();

shopApiRouter.get("/products", getProducts);

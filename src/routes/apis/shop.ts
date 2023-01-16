import express from "express";
import { getProducts } from "../../controllers/replica-for-apis/shop";

const shopRouter = express.Router();

shopRouter.get("/api/products", getProducts);

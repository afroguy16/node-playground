import express from "express";

import { products } from "./admin";

const shopRouter = express.Router();

const pathName = "/";
const pageTitle = "My Products";

shopRouter.get("/", (req, res, next) => {
  res.render("shop", { pageTitle, pathName, products });
});

export default shopRouter;

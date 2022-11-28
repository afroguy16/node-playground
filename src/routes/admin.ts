import path from "path";

import express from "express";

import rootDirectory from "../utils/path";

const adminRouter = express.Router();

adminRouter.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "add-product.html"));
});

adminRouter.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default adminRouter;

import express from "express";

export const adminRouter = express.Router();

const pageTitle = "Add Product";
const pathName = "/admin/add-product";
export const products: Array<{ title: string }> = [];

adminRouter.get("/add-product", (req, res, next) => {
  res.render("add-product", { pageTitle, pathName });
});

adminRouter.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

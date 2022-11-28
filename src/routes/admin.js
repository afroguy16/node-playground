import express from "express";

const adminRouter = express.Router();

adminRouter.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/admin/product" method="POST"><input type="text" name="title"><button>Submit</button></form>'
  );
});

adminRouter.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default adminRouter;

import express from "express";

const shopRouter = express.Router();

shopRouter.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

export default shopRouter;

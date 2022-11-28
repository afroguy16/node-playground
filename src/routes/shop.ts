import path from "path";

import express from "express";

import rootDirectory from "../utils/path";

const shopRouter = express.Router();

shopRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDirectory, "views", "shop.html"));
});

export default shopRouter;

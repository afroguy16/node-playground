import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDirectory from "./utils/path";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDirectory, "views", "not-found.html"));
});

app.listen(4000);

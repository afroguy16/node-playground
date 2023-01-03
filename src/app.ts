import path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootDirectory from "./utils/path";
import { adminRouter as adminRoutes } from "./routes/admin";
import shopRoutes from "./routes/shop";

var pathName: string;
const pageTitle = "Page not found";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDirectory, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle, pathName });
});

app.listen(4000);

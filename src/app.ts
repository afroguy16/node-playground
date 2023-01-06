import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { rootDirectory } from "./utils";
import { adminRouter as adminRoutes } from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import sequelize from "./utils/database";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDirectory, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

sequelize
  .sync()
  .then((data) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));

import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { connection as mongoConnect } from "./utils/database";
import { rootDirectory } from "./utils";

import { adminRouter as adminRoutes } from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDirectory, "public")));

// app.use((req, res, next) => {
//   SequelizedUser.findByPk(1)
//     .then((user) => {
//       (req as any).user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect()
  .then((client) => {
    app.listen(4000);
  })
  .catch((error) => console.log(error));

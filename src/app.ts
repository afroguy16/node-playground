import path from "path";
import express from "express";
import bodyParser from "body-parser";

import { rootDirectory } from "./utils";
import { adminRouter as adminRoutes } from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import sequelize from "./utils/database";
import SequelizedProduct from "./services/database/Product";
import SequelizedUser from "./services/database/User";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDirectory, "public")));

app.use((req, res, next) => {
  SequelizedUser.findByPk(1)
    .then((user) => {
      (req as any).user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

SequelizedProduct.belongsTo(SequelizedUser, {
  constraints: true,
  onDelete: "CASCADE",
});
SequelizedUser.hasMany(SequelizedProduct);

sequelize
  .sync()
  .then((data) => {
    return SequelizedUser.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return SequelizedUser.create({ name: "Joe", email: "joe@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user)
    app.listen(4000);
  })
  .catch((err) => console.log(err));

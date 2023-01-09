import path from "path";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { rootDirectory } from "./utils";
import { adminRouter as adminRoutes } from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import User from "./models/User";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDirectory, "public")));

app.use(async (req, res, next) => {
  try {
    const user = await User.get("63bac083deab7ea88de46a97");
    (req as any).user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://afroguy16:_cNtka5miKjv.3s@cluster0.7l9wyuh.mongodb.net/shop?retryWrites=true&w=majority"
    );
    console.log("connected with mongoose");
    app.listen(4000);
  } catch (e) {
    console.log(e);
  }
})();

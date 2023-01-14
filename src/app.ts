import path from "path";

import express from "express";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import csurf from "csurf";

import { rootDirectory } from "./utils";
import { adminRouter as adminRoutes } from "./routes/admin";
import shopRoutes from "./routes/shop";
import { get404 } from "./controllers/error";
import authRouter from "./routes/auth";

const MONGODB_URI =
  "mongodb+srv://afroguy16:_cNtka5miKjv.3s@cluster0.7l9wyuh.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const MongoDBStore = connectMongoDbSession(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csurf();

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDirectory, "public")));
app.use(
  session({
    secret: "dksjosidoslskdsjdiuskskdslsi",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.error = undefined;
  res.locals.isLoggedIn = (req as any).session?.user?._id;
  res.locals.csrfToken = (req as any).csrfToken();
  next();
});

app.use(authRouter);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render("errors/server", {
    pageTitle: "Server error",
    pathName: "/server",
  });
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected with mongoose");
    app.listen(4000);
  } catch (e) {
    console.log(e);
  }
})();

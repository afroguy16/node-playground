import path from "path";

import express from "express";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import { v4 as generateUuid } from "uuid";

import { rootDirectory } from "./utils";
import { get404 } from "./controllers/error";
import { ERROR_CODE_SERVER } from "./controllers/constants";
import { adminApiRouter } from "./routes/apis/admin";
import { authRouter } from "./routes/auth";
import { shopApiRouter } from "./routes/apis/shop";
import shopRouter from "./routes/shop";
import SocketService from "./services/SocketService";

const MONGODB_URI =
  "mongodb+srv://afroguy16:_cNtka5miKjv.3s@cluster0.7l9wyuh.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const MongoDBStore = connectMongoDbSession(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const fileStorage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, `${generateUuid()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", path.join(rootDirectory, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
app.use(express.static(path.join(rootDirectory, "public")));
app.use("/images", express.static(path.join(rootDirectory, "../images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  session({
    secret: "gotcha",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  res.locals.error = undefined;
  res.locals.isLoggedIn = (req as any).session?.user?._id;
  next();
});

app.use(shopRouter);
app.use("/api", authRouter);
app.use("/admin/api", adminApiRouter);
app.use("/api", shopApiRouter);

app.use(get404);

app.use((error, req, res, next) => {
  console.log(error);
  return res
    .status(ERROR_CODE_SERVER)
    .json({ message: "Something went wrong", error });
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected with mongoose");
    const server = app.listen(4000);
    await SocketService.init(server);
  } catch (e) {
    console.log(e);
  }
})();

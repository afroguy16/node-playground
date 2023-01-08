const MONGO_DB_URL =
  "mongodb+srv://afroguy16:_cNtka5miKjv.3s@cluster0.7l9wyuh.mongodb.net/?retryWrites=true&w=majority";
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
let _db;

export const connection = async () => {
  const client = await MongoClient.connect(MONGO_DB_URL);
  console.log("connected");
  _db = client.db("shop");
  return client;
};

export const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("No database found");
  }
};

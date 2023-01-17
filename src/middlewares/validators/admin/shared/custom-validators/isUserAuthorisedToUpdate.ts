import { Request } from "express-validator/src/base";
import Product from "../../../../../models/Product";

export default async (productId: string, req: Request) => {
  const product = await Product.get(productId);
  if (!product) {
    throw new Error("No product found");
  } else if (product.userId.toString() !== req.jwt.userId) {
    throw new Error("Unauthorised");
  } else {
    return true;
  }
};

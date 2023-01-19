import Product from "../../../../../models/Product";

export default async (productId: string, req) => {
  const product = await Product.get(productId);
  if (!product) {
    return false;
  }
  req.product = product;
  return true;
};

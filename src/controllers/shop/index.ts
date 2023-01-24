import Product from "../../models/Product";
import {
  DEFAULT_PAGE_NUMBER,
  ERROR_CODE_SERVER,
  ITEMS_PER_PAGE,
  SUCCESS_CODE,
} from "../utils/constants";

export const getProducts = async (req, res, next) => {
  const { page: paramsPage } = req.query;
  const page = paramsPage || DEFAULT_PAGE_NUMBER;
  try {
    const productCount = await Product.getAllProductsCount();
    const products = await Product.getAll({ pagination: { page } });
    res.status(SUCCESS_CODE).json({
      message: "Products retrieved successfully",
      data: {
        currentPage: Number(page),
        pageCount: Math.ceil(productCount / ITEMS_PER_PAGE),
        products,
      },
    });
  } catch (e) {
    res.status(ERROR_CODE_SERVER).json({ message: "failed to fetch products" });
  }
};

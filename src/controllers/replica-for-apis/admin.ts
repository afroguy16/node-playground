import { validationResult } from "express-validator";
import Product from "../../models/Product";
import { ProductAttributes } from "../../models/Product/interfaces";
import {
  DEFAULT_PAGE_NUMBER,
  ERROR_CODE_SERVER,
  ERROR_CODE_UNPROCESSED_ENTITY,
  ITEMS_PER_PAGE,
  SUCCESS_CODE,
  SUCCESS_CODE_CREATED,
} from "../constants";

export const postCreateProduct = async (req, res) => {
  const { title, description, price } = req.body;
  const imageUrl = req.file?.path;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .json({ message: "Illegal content", error: errors.array() });
  }

  const payload: Omit<ProductAttributes, "_id"> = {
    userId: req.jwt.userId,
    title,
    imageUrl,
    description,
    price,
  };
  try {
    await Product.create(payload);
    res
      .status(SUCCESS_CODE_CREATED)
      .json({ message: "Post created successfully" });
  } catch (e) {
    res
      .status(ERROR_CODE_SERVER)
      .json({ message: "Failed to upload", error: e });
  }
};

export const getProducts = async (req, res, next) => {
  const userId = req.jwt.userId;
  const { page: paramsPage } = req.query;
  const page = paramsPage || DEFAULT_PAGE_NUMBER;
  try {
    const productCount = await Product.getAllProductsCount({
      filter: { userId },
    });
    const products = await Product.getAll({
      pagination: { page },
      filter: { userId },
    });
    res.status(SUCCESS_CODE).json({
      page: Number(page),
      pageCount: Math.ceil(productCount / ITEMS_PER_PAGE),
      products,
    });
  } catch (e) {
    res
      .status(ERROR_CODE_SERVER)
      .json({ message: "Get product failed", error: e });
  }
};

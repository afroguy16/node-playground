import { validationResult } from "express-validator";
import Product from "../../models/Product";
import { ProductAttributes } from "../../models/Product/interfaces";
import {
  ERROR_CODE_SERVER,
  ERROR_CODE_UNPROCESSED_ENTITY,
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

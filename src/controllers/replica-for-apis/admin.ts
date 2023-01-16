import { validationResult } from "express-validator";
import Product from "../../models/Product";
import { ProductAttributes } from "../../models/Product/interfaces";
import { ERROR_CODE_SERVER, SUCCESS_CODE_CREATED } from "../constants";

export const postCreateProduct = async (req, res, next) => {
  console.log("called now");
  console.log(req.body._csrf);
  console.log("got called");
  const { title, description, price } = req.body;
  const imageUrl = req.file?.path;
  const errors = validationResult(req);

  // if (!errors.isEmpty() || !imageUrl) {
  //   return res
  //     .status(ERROR_CODE_UNPROCESSED_ENTITY)
  //     .render("admin/update-product", {
  //       pathName: "radmin/add-product",
  //       pageTitle: "Add Product",
  //       editing: false,
  //       product: { title, description, price },
  //       error: !imageUrl ? "Upload a jpg or png image" : errors.array()[0].msg,
  //     });
  // }

  const payload: Omit<ProductAttributes, "_id"> = {
    userId: req.session.user._id,
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
    res.status(ERROR_CODE_SERVER).json({ message: "Failed to upload" });
  }
};

import { ProductAttributes } from "../models/Product/interfaces";
import Product from "../models/Product";
import { validationResult } from "express-validator";
import {
  DEFAULT_PAGE_NUMBER,
  ERROR_CODE_SERVER,
  ERROR_CODE_UNPROCESSED_ENTITY,
  ITEMS_PER_PAGE,
  SUCCESS_CODE,
} from "./constants";
import { Optional } from "../utils/types";

export const getProducts = async (req, res, next) => {
  const userId = req.session.user._id;
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
    res.render("admin/products", {
      pageTitle: "Admin Products",
      pathName: "admin/products",
      page: Number(page),
      pageCount: Math.ceil(productCount / ITEMS_PER_PAGE),
      products,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCreateProduct = (req, res, next) => {
  res.render("admin/update-product", {
    pageTitle: "Add Product",
    pathName: "admin/add-product",
    editing: false,
    product: {
      title: undefined,
      image: undefined,
      description: undefined,
      price: undefined,
    },
  });
};

export const postCreateProduct = async (req, res, next) => {
  const { title, description, price } = req.body;
  const imageUrl = req.file?.path;
  const errors = validationResult(req);

  if (!errors.isEmpty() || !imageUrl) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .render("admin/update-product", {
        pathName: "radmin/add-product",
        pageTitle: "Add Product",
        editing: false,
        product: { title, description, price },
        error: !imageUrl ? "Upload a jpg or png image" : errors.array()[0].msg,
      });
  }

  const payload: Omit<ProductAttributes, "_id"> = {
    userId: req.session.user._id,
    title,
    imageUrl,
    description,
    price,
  };
  try {
    await Product.create(payload);
    res.redirect("products");
  } catch (e) {
    const error = { status: ERROR_CODE_SERVER, error: e };
    next(error);
  }
};

export const getEditProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.get(productId);
    req.session.product = product;
    res.render("admin/update-product", {
      pageTitle: `Edit ${product?.title}`,
      pathName: "admin/edit-product/:productId",
      editing: true,
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

export const postEditProduct = async (req, res, next) => {
  const { _id, title, description, price } = req.body;
  const imageUrl = req.file?.path;
  const isAuthorizedUser =
    req.session.product.userId.toString() === req.session.user._id.toString();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .render("admin/update-product", {
        pathName: "radmin/add-product",
        pageTitle: "Add Product",
        editing: false,
        product: { title, imageUrl, description, price },
        error: !imageUrl ? "Upload a jpg or png image" : errors.array()[0].msg,
      });
  }
  try {
    if (isAuthorizedUser) {
      const payload: Optional<ProductAttributes, "imageUrl" | "userId"> = {
        _id,
        title,
        description,
        price,
      };
      if (imageUrl) {
        payload.imageUrl = imageUrl;
      }
      await Product.update({ ...payload });
    }
    res.redirect("products");
  } catch (e) {
    const error = { status: ERROR_CODE_SERVER, error: e };
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.get(productId);
    const isAuthorizedUser =
      product?.userId.toString() === req.session.user._id.toString();
    console.log(isAuthorizedUser, productId);
    isAuthorizedUser && (await Product.delete(productId));
    res.status(SUCCESS_CODE).json({ message: "success" });
  } catch (e) {
    res.status(ERROR_CODE_SERVER).json({ message: "product delete failed" });
  }
};

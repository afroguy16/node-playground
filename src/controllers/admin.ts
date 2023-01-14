import { ProductAttributes } from "../models/Product/interfaces";
import Product from "../models/Product";
import { validationResult } from "express-validator";
import { ERROR_CODE_SERVER, ERROR_CODE_UNPROCESSED_ENTITY } from "./constants";

export const pagesData = {
  editProduct: {
    pathName: "admin/edit-product/:productId",
  },
};

export const getProducts = async (req, res, next) => {
  const userId = req.session.user._id;
  try {
    const products = await Product.getByFilter({ userId });
    res.render("admin/products", {
      pageTitle: "Admin Products",
      pathName: "admin/products",
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
      imageUrl: undefined,
      description: undefined,
      price: undefined,
    },
  });
};

export const postCreateProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const errors = validationResult(req);

  console.log(title);

  if (!errors.isEmpty()) {
    return res
      .status(ERROR_CODE_UNPROCESSED_ENTITY)
      .render("admin/update-product", {
        pathName: "radmin/add-product",
        pageTitle: "Add Product",
        editing: false,
        product: { title, imageUrl, description, price },
        error: errors.array()[0].msg,
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
      pathName: pagesData.editProduct.pathName,
      editing: true,
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

export const postUpdateProduct = async (req, res, next) => {
  const { _id, title, imageUrl, description, price } = req.body;
  const isAuthorizedUser =
    req.session.product.userId.toString() === req.session.user._id.toString();
  try {
    if (isAuthorizedUser) {
      await Product.update({
        _id,
        title,
        imageUrl,
        description,
        price,
      });
    }
    res.redirect("products");
  } catch (e) {
    console.log(e);
  }
};

export const postDeleteProduct = async (req, res, next) => {
  const { id } = req.body;
  try {
    const product = await Product.get(id);
    const isAuthorizedUser =
      product?.userId.toString() === req.session.user._id.toString();
    isAuthorizedUser && (await Product.delete(id));
    res.redirect("products");
  } catch (e) {
    console.log(e);
  }
};

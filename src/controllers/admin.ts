import { ProductAttributes } from "../models/Product/interfaces";
import Product from "../models/Product";

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
  });
};

export const postCreateProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
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
    console.log(e);
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

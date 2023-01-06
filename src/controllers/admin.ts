import Product, { ProductState } from "../models/Product";

export const pagesData = {
  addProduct: {
    title: "Add Product",
    pathName: "admin/add-product",
  },
  editProduct: {
    pathName: "admin/edit-product/:productId",
  },
  getProducts: {
    title: "Admin Products",
    pathName: "admin/products",
  },
};

export const getAddProduct = (req, res, next) => {
  res.render("admin/update-product", {
    pageTitle: pagesData.addProduct.title,
    pathName: pagesData.addProduct.pathName,
    editing: false,
  });
};

export const getEditProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.fetchProduct(productId)
    .then((product) => {
      res.render("admin/update-product", {
        pageTitle: `Edit ${(product as unknown as ProductState)?.title}`,
        pathName: pagesData.editProduct.pathName,
        editing: true,
        product,
      });
    })
    .catch();
};

export const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: pagesData.getProducts.title,
        pathName: pagesData.getProducts.pathName,
        products,
      });
    })
    .catch((error) => console.log(error));
};

export const postCreateProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  Product.create({ title, imageUrl, description, price }, (err) => {
    if (!err) {
      res.redirect("products");
    } else {
      console.log(err);
    }
  });
};

export const postUpdateProduct = (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body;
  Product.update({ id, title, imageUrl, description, price }, (err) => {
    if (!err) {
      res.redirect("products");
    } else {
      console.log(err);
    }
  });
};

export const postDeleteProduct = (req, res, next) => {
  const { id } = req.body;
  Product.delete(id, () => res.redirect("products"));
};

import Product from "../models/Product";

const pagesData = {
  addProduct: {
    title: "Add Product",
    pathName: "/admin/add-product",
  },
  myProducts: {
    title: "My Products",
    pathName: "/",
  },
};

export const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: pagesData.addProduct.title,
    pathName: pagesData.addProduct.pathName,
  });
};

export const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      pageTitle: pagesData.myProducts.title,
      pathName: pagesData.myProducts.pathName,
      products,
    });
  });
};

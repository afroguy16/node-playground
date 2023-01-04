import Product from "../models/Product";

export const pagesData = {
  addProduct: {
    title: "Add Product",
    pathName: "admin/add-product",
  },
  getProducts: {
    title: "Admin Products",
    pathName: "admin/products",
  },
};

export const getAddProduct = (req, res, next) => {
  res.render(pagesData.addProduct.pathName, {
    pageTitle: pagesData.addProduct.title,
    pathName: pagesData.addProduct.pathName,
  });
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: pagesData.getProducts.title,
      pathName: pagesData.getProducts.pathName,
      products,
    });
  });
};

export const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

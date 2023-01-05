import Product from "../models/Product";

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
  Product.fetchProduct((product) => {
    res.render("admin/update-product", {
      pageTitle: `Edit ${product?.title}`,
      pathName: pagesData.editProduct.pathName,
      editing: true,
      product,
    });
  }, productId);
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

export const postUpdateProduct = (req, res, next) => {
  const { id, title, imageUrl, description, price } = req.body;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect("admin/products");
};

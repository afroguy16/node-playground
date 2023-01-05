import Cart from "../models/Cart";
import Product from "../models/Product";

export const pagesData = {
  shop: {
    title: "Shop",
    pathName: "/",
  },
  myProducts: {
    title: "All products",
    pathName: "/products",
  },
  cart: {
    title: "Your Cart",
    pathName: "/cart",
  },
  checkout: {
    title: "Checkout",
    pathName: "/checkout",
  },
  productDetails: {
    title: "Product Details",
  },
};

export const getHome = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      pageTitle: pagesData.shop.title,
      pathName: pagesData.shop.pathName,
      products,
    });
  });
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      pageTitle: pagesData.myProducts.title,
      pathName: pagesData.myProducts.pathName,
      products,
    });
  });
};

export const getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.fetchProduct((product) => {
    res.render("shop/product-detail", {
      pageTitle: product?.title,
      pathName: pagesData.myProducts.pathName,
      product,
    });
  }, productId);
};

export const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: pagesData.cart.title,
    pathName: pagesData.cart.pathName,
  });
};

export const postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.fetchProduct((product) => {
    Cart.addProduct(product?.id || "", product?.price || 0);
    // res.render("shop/product-detail", {
    //   pageTitle: product.title,
    //   pathName: pagesData.myProducts.pathName,
    //   product,
    // });
  }, productId);
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: pagesData.checkout.title,
    pathName: pagesData.checkout.pathName,
  });
};

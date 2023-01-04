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
    pathName: "shop/product/:id",
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

export const getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: pagesData.cart.title,
    pathName: pagesData.cart.pathName,
  });
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: pagesData.checkout.title,
    pathName: pagesData.checkout.pathName,
  });
};

// export const getProductDetail = (req, res, next) => {
//   res.render('shop/product-details', {
//     pageTitle: pagesData.productDetails.title,
//     pathName: pagesData.productDetails.pathName
//   });
// };

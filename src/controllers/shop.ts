import Cart from "../models/Cart";
import Product, { ProductState } from "../models/Product";
import { isEmpty } from "../utils";

interface CartProduct {
  product: ProductState;
  quantity: number;
  totalPrice: number;
}

interface Cart {
  products: Array<CartProduct>;
  totalPrice: number;
}

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
  Cart.getCart((cart) => {
    const cartProducts: Array<CartProduct> = [];
    let cartTotalPrice = 0;
    const cartProductIdsAndQuantities: { [key: string]: number } = {};

    cart.products.forEach((product) => {
      cartProductIdsAndQuantities[product.id] = product.quantity;
    });

    Product.fetchAll((products) => {
      // Move logic out
      if (!isEmpty(products)) {
        products.forEach((product) => {
          if (cartProductIdsAndQuantities[product.id] > 0) {
            const totalPrice =
              product.price * cartProductIdsAndQuantities[product.id];
            cartProducts.push({
              product,
              quantity: cartProductIdsAndQuantities[product.id],
              totalPrice,
            });
            cartTotalPrice += totalPrice;
          }
        });
      }

      res.render("shop/cart", {
        pageTitle: pagesData.cart.title,
        pathName: pagesData.cart.pathName,
        cart: { products: cartProducts, totalPrice: cartTotalPrice },
      });
    });
  });
};

export const postAddProductToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.fetchProduct((product) => {
    Cart.add(product?.id || "", product?.price || 0, () => {
      res.redirect("/cart");
    });
  }, productId);
};

export const postRemoveProductFromCart = (req, res, next) => {
  const { id } = req.body;
  Cart.remove(id, () => {
    res.redirect("/cart");
  });
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: pagesData.checkout.title,
    pathName: pagesData.checkout.pathName,
  });
};

import Cart from "../models/Cart";
import Order from "../models/Order";
import Product, { ProductState } from "../models/Product";

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
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        pageTitle: pagesData.shop.title,
        pathName: pagesData.shop.pathName,
        products,
      });
    })
    .catch((error) => console.log(error));
};

export const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        pageTitle: pagesData.myProducts.title,
        pathName: pagesData.myProducts.pathName,
        products,
      });
    })
    .catch((error) => console.log(error));
};

export const getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.fetchProduct(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: (product as unknown as ProductState)?.title,
        pathName: pagesData.myProducts.pathName,
        product,
      });
    })
    .catch();
};

export const getCart = async (req, res, next) => {
  const cart = await Cart.getCart(req.user);
  const productsInCart = await cart?.getSequelizedProducts();

  try {
    res.render("shop/cart", {
      pageTitle: pagesData.cart.title,
      pathName: pagesData.cart.pathName,
      cart: { id: cart.id, products: productsInCart, totalPrice: 0 },
    });
  } catch (error) {
    console.log(error);
  }
};

export const postAddProductToCart = async (req, res, next) => {
  const { productId } = req.body;
  try {
    await Cart.add(req.user, productId);
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

export const postRemoveProductFromCart = async (req, res, next) => {
  const { id } = req.body;
  try {
    await Cart.remove(req.user, id);
    res.redirect("/cart");
  } catch (e) {
    console.log(e);
  }
};

export const postCreateOrder = async (req, res, next) => {
  const cart = await Cart.getCart(req.user);
  try {
    await Order.createOrder(req.user, cart);
    res.redirect("/order");
  } catch (e) {
    console.log(e);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.getAllOrders(req.user);
    res.render("shop/orders", {
      pageTitle: "My orders",
      pathName: "/orders",
      orders,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: pagesData.checkout.title,
    pathName: pagesData.checkout.pathName,
  });
};

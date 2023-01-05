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
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/index", {
        pageTitle: pagesData.shop.title,
        pathName: pagesData.shop.pathName,
        products,
      });
    })
    .catch();
};

export const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render("shop/product-list", {
        pageTitle: pagesData.myProducts.title,
        pathName: pagesData.myProducts.pathName,
        products,
      });
    })
    .catch();
};

export const getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.fetchProduct(productId)
    .then(([wrappedProduct]) => {
      const product: ProductState = wrappedProduct[0];
      res.render("shop/product-detail", {
        pageTitle: product?.title,
        pathName: pagesData.myProducts.pathName,
        product,
      });
    })
    .catch();
};

export const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    const cartProducts: Array<CartProduct> = [];
    let cartTotalPrice = 0;
    const cartProductIdsAndQuantities: { [key: string]: number } = {};

    // console.log(cart)

    cart.products.forEach((product) => {
      cartProductIdsAndQuantities[product.id] = product.quantity;
    });

    Product.fetchAll()
      .then(([products]) => {
        // Move logic out
        if (!isEmpty(products as any)) {
          (products as any).forEach((product) => {
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
      })
      .catch();
  });
};

export const postAddProductToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.fetchProduct(productId)
    .then(([wrappedProduct]) => {
      const product: ProductState = wrappedProduct[0];
      Cart.add(product?.id || "", product?.price || 0, () => {
        res.redirect("/cart");
      });
    })
    .catch();
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
